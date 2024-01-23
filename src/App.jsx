import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "./views/Landing/Landing";
import Homepage from "./views/Homepage/Homepage";
import Navbar from "./components/Navbar/Navbar";
import DetailPost from "./views/Detail/DetailPost/DetailPost";
import DetailUser from "./views/Detail/DetaiUser/DetailUser";
import Post from "./views/Post/Post";
import { useLocation } from "react-router-dom";
import { LoginSignin } from "./views/LoginSignin/LoginSignin";
import { SignInView } from "./views/signing/SignInView";
import { FooterLinks } from "./views/FooterLinks/FooterLinks";
import Reserve from "./views/Reserve/Reserve";
import UserEditProperty from "./views/UserEditProperty/UserEditProperty";
import EditUser from "./views/EditUser/EditUser";
import AceptedPay from "./views/AceptedPay/AceptedPay";
import TutorialPost from "./views/TutorialPost/TutorialPost";
import DashboardAdmin from "./views/Dashboard/DashboardAdmin";
import { db, storage } from "./config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { listAll, ref } from "firebase/storage";
import { getPropertiesList } from "./config/handlers";
import Dashboard from "./views/Dashboard/Dash/Dashboard";
import UsersPanel from "./components/UserPanel/UserPanel";
import PropertyDash from "./views/Dashboard/PropertyDash/PropertyDash";
import UserDash from "./views/Dashboard/UserDash/UserDash";
import Profit from "./views/Dashboard/Profit/Profit";
import ReviewsDash from "./views/Dashboard/ReviewDash/ReviewDash";
import FailedPay from "./views/FailedPay/FailedPay";
import FailureView from "./views/Dashboard/FailureDash/view/FailureView"

function App() {
  const imageUrlRef = ref(storage, 'properties/');
  const [host, setHost] = useState([]);
  const [originalHost, setOriginalHost] = useState([]);
  const [totalProperties, setTotalProperties] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalImages, setTotalImages] = useState(0);

  const location = useLocation();

  useEffect(() => {
    async function fetchProperties() {
      try {
        const properties = await getPropertiesList();
        setOriginalHost(properties);
        setHost(properties);
        setTotalProperties(properties.length);

        const usersSnapshot = await getDocs(collection(db, "users"));
        setTotalUsers(usersSnapshot.size);

        const imagesSnapshot = await listAll(imageUrlRef);
        
        setTotalImages(imagesSnapshot.items.length);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    }
    fetchProperties();
    console.log(host)
  }, [location.pathname]);

  return (
    <div className="App">
      {location.pathname !== "/" ? <Navbar /> : null}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/home"
          element={
            <Homepage
              host={host}
              setHost={setHost}
              originalHost={originalHost}
              setOriginalHost={setOriginalHost}
            />
          }
        />
        {/* <Route path="/reserve/:id" element={<Reserve />} /> */}
          <Route path='/reserve/:subTotal/:propertyId/:selectedDays/:propertyName' element={<Reserve/>}/>
        <Route path="/login" element={<LoginSignin />} />
        <Route path="/signin" element={<SignInView />} />
        <Route path="/rooms/:id" element={<DetailPost />} />
        <Route path="/user/:id" element={<DetailUser />} />
        <Route path="/privacy&termns" element={<FooterLinks />} />
        <Route path="/editpr/:id" element={<UserEditProperty />} />
        <Route path="/config/:id" element={<EditUser />} />
        <Route path="/post" element={<Post />} />
        <Route path="/nice" element={<AceptedPay />} />
        <Route path="/failure" element={<FailedPay />} />
        <Route path="/tutorial" element={<TutorialPost />} />
        <Route path="/admin" element={<DashboardAdmin />}>
          <Route
            path="/admin/"
            element={
              <Dashboard
                totalImages={totalImages}
                totalProperties={totalProperties}
                totalUsers={totalUsers}
                setTotalImages={setTotalImages}
                setTotalProperties={setTotalProperties}
                setTotalUsers={setTotalUsers}
              />
            }
          />
          <Route path="/admin/propertys" element={<PropertyDash />} />
          <Route path="/admin/users" element={<UserDash />} />
          <Route path="/admin/reviews" element={<ReviewsDash />} />
          <Route path="/admin/rent-profit" element={<Profit />} />
          <Route path="/admin/failures" element={<FailureView/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
