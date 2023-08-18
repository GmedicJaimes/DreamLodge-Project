import UsersPanel from "../../../components/UserPanel/UserPanel";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from '../../../config/firebase';

const UserDash = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const usersData = usersSnapshot.docs.map(doc => doc.data());
        setUsers(usersData);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, [])

  const handleDeleteUsers = async (userId) => {
    const confirmDelete = window.confirm('¿Estas seguro de que deseas borrar este usuario?');
    if (confirmDelete) {
      try {
       
        const propertyRef = db.collection('users').doc(userId);
  
 
        await propertyRef.update({ deleted: true });
  
       
        setFilteredProperties(prevProperties =>
          prevProperties.filter(property => property.id !== propertyId)
        );
  
        console.log(`Usuario con ID ${userId} borrada lógicamente.`);
      } catch (error) {
        console.error('Error al borrar el usuario:', error);
      }
    }
  };

  return(
    <div>
      <UsersPanel users={users} handleDeleteUsers={handleDeleteUsers}/>
    </div>
  )
}

export default UserDash;