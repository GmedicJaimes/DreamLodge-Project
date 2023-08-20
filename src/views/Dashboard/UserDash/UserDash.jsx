import UsersPanel from "../../../components/UserPanel/UserPanel";
import { useEffect, useState } from "react";
import { getDocs, collection, doc, updateDoc } from "firebase/firestore";
import { db } from '../../../config/firebase';
import style from '../PropertyDash/property.module.css'
const UserDash = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const usersData = usersSnapshot.docs.map(doc =>({ id: doc.id, ...doc.data() }));
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
          className: style.button
        },
      }, 
      
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
              className: style.nice,
            },
          }
        })
      }
    });
    if (confirmDelete) {
      try {
        const userRef = doc(db, 'users', userId); 
    
        await updateDoc(userRef, { delete: true });
    
        setUsers(prevUsers =>
          prevUsers.filter(user => user.id !== userId)
        );
    
        console.log(`User ${userId} deleted successfully`);
      } catch (error) {
        console.error('Error deleting user:', error);
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