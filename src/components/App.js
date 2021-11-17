import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import NewCampgroundPage from './NewCampgroundPage';
import Footer from './Footer';
import LandingPage from './LandingPage';
import CampgroundsPage from './CampgroundsPage';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import CampgroundPage from './CampgroundPage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/campgrounds' element={<CampgroundsPage />} />
        <Route path='/campgrounds/:campgroundId' element={<CampgroundPage />} />
        <Route path='/new-campground' element={<NewCampgroundPage />} />
        <Route path='/sign-in' element={<SignInPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
