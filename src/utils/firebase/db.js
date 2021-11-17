import { getFirestore, collection, getDocs } from 'firebase/firestore';
import yelpCampFirebaseApp from './firebase';

const db = getFirestore(yelpCampFirebaseApp);

// Get a list of campgrounds from firebase database
export async function getCamps() {
  const campsCol = collection(db, 'camps');
  const campsSnapshot = await getDocs(campsCol);
  const campsList = campsSnapshot.docs.map((doc) => doc.data());
  return campsList;
}
