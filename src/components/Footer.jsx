import Logo from './Logo';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  let currentPath = useLocation();

  if (currentPath.pathname !== '/')
    return (
      <footer className='px-6 py-24'>
        <Logo />
      </footer>
    );
  else return null;
};

export default Footer;
