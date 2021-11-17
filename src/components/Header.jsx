import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import Banner from './Banner';

const Header = () => {
  let loc = useLocation();

  return (
    <>
      {loc.pathname !== '/' && <Banner />}
      <NavBar />
    </>
  );
};
export default Header;
