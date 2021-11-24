import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import moment from 'moment';
import { db } from './firebaseConfig';

// Get a list of campgrounds from firebase database
export async function getCamps() {
  const q = query(collection(db, 'campgrounds'));
  const querySnapshot = await getDocs(q);
  const campsList = [];
  querySnapshot.forEach((doc) => campsList.push(doc.data()));
  return campsList;
}
export async function getReviews(id) {
  const reviewsCol = collection(db, 'reviews');
  const q = query(reviewsCol, where('campId', '==', `${id}`));
  const reviewsData = await getDocs(q);
  const reviewsList = [];
  reviewsData.forEach((doc) => reviewsList.push(doc.data()));
  return reviewsList;
}
export async function getCamp(id) {
  const campsCol = collection(db, 'campgrounds');
  const q = query(campsCol, where('campId', '==', `${id}`));
  let campData = await getDocs(q);
  let camp = {};
  campData.forEach((doc) => (camp = doc.data()));
  return camp;
}

export async function getUserName(email) {
  const usersCol = collection(db, 'users');
  const q = query(usersCol, where('email', '==', `${email}`));
  const userData = await getDocs(q);
  let userName = '';
  userData.forEach((doc) => (userName = doc.data().name));
  return userName;
}

export function addUser(uid, name, email) {
  return addDoc(collection(db, 'users'), {
    uid: uid,
    name: name,
    email: email,
    reviews: [],
    camps: [],
    createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
  });
}
export function addCamp(campName, price, url, description, userName) {
  return addDoc(collection(db, 'campgrounds'), {
    name: campName,
    campId: campName.split(' ').join('-').toLowerCase(),
    image: url,
    map: '',
    price: price,
    description: description,
    reviews: [],
    submittedBy: userName,
    createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
  });
}
export function addReview(campID, userName, description) {
  return addDoc(collection(db, 'reviews'), {
    campId: campID,
    description: description,
    submittedBy: userName,
    createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
  });
}
