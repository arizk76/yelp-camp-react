import { getAuth, onAuthStateChanged, getRedirectResult } from 'firebase/auth';
import yelpCampFirebaseApp from './firebase';

const auth = getAuth(yelpCampFirebaseApp);
