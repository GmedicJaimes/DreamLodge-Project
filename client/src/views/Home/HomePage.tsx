import Cards from "../../components/Cards/Cards"
import { Footer } from "../../components/Footer/Footer"
import Login from "../../components/Login/Login"
import SearchBar from "../../components/SearchBar/SearchBar"
import SingIn from "../../components/SingIn/SingIn"


export const HomePage: React.FC = () => {
  return (
    <div>
        <h1>homePage</h1>
        <Cards/>
        <SearchBar/>
        <Login/>
        <SingIn/>
        <Footer/>

    </div>
  )
}
