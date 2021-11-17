import { useLocation } from 'react-router-dom';
import Logo from './Logo';
import MobileMenu from './MobileMenu';

const NavBar = () => {
  let currentPath = useLocation();

  return (
    <>
      <nav
        className={`relative w-auto px-6 py-8 flex justify-between ${
          currentPath.pathname !== '/' ? 'bg-white' : 'bg-floral-white'
        }`}
      >
        <Logo />
        {currentPath.pathname !== '/' && <MobileMenu />}
      </nav>
    </>
  );
};

export default NavBar;
