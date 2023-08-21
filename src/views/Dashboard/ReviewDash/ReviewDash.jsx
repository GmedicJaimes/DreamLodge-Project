import { useEffect, useState } from "react";
import { getDocs, collection, doc, updateDoc } from "firebase/firestore";
import { db } from '../../../config/firebase';
import ReviewPanel from "../../../components/ReviewPanel/ReviewPanel";


const ReviewsDash = () => {

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const reviewsSnapshot = await getDocs(collection(db, 'reviews'));
        const reviewsData = reviewsSnapshot.docs.map(doc =>({ id: doc.id, ...doc.data() }));
        setReviews(reviewsData);
      } catch (error) {
        console.error(error);
      }
    };
    getReviews();
  }, [])

  const handleDeleteReviews = async (reviewsId) => {
    const confirmDelete = swal({
      title: 'Reviews Deleted',  
      text: 'The review has been deleted successfully',
      icon:'success', 
      dangerMode: true
      
    })
    if (confirmDelete) {
      try {
        const userRef = doc(db, 'reviews', reviewsId); 
    
        await updateDoc(userRef, { delete: true });
    
        setReviews(prevReviews =>
          prevReviews.filter(revi => revi.id !== reviewsId)
        );
      } catch (error) {
        console.error('Error deleting review:', error);
      }
    }
  };

  return(
    <div>
      <ReviewPanel reviews={reviews} handleDeleteReviews={handleDeleteReviews}/>
    </div>
  )
}

export default ReviewsDash;