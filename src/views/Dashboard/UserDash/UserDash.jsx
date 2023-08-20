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
    const confirmDelete = swal({
      title: 'Delet User', 
      text:'Are you sure you want to delete this user?', 
      icon:'warning', 
      buttons: {
        cancel: {
          text: 'Nope',
          value: false,
          visible: true,
        },
        confirm: {
          text: 'Delete ',
          value: true,
          visible: true,
        },
      }, 
      dangerMode: true
      
    }).then(respuesta => {
      if(respuesta){
        swal({
          text: 'The user has been deleted successfully',
          icon: 'success',
          buttons: {
            confirm: {
              text: 'Ok ',
              value: true,
              visible: true,
            },
          },
          dangerMode: true
        })
      }
    });
    if (confirmDelete) {
      try {
       
        const propertyRef = db.collection('users').doc(userId);
  
 
        await propertyRef.update({ deleted: true });
  
       
        setFilteredProperties(prevProperties =>
          prevProperties.filter(property => property.id !== propertyId)
        );
  
        console.log(`Usuario con ID ${userId} borrada lógicamente.`);
      } catch (error) {
        // console.error('Error al borrar el usuario:', error);
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