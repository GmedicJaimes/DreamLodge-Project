import UsersPanel from "../../../components/UserPanel/UserPanel";
import { useEffect, useState } from "react";
import { getDocs, collection, doc, updateDoc } from "firebase/firestore";
import { db } from '../../../config/firebase';


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
      title: 'User Deleted', 
      text:'The user has been deleted successfully', 
      icon:'success', 
      dangerMode: true
      
    })

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