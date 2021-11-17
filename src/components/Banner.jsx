import { useLocalStorage } from '../utils/useLocalStorage.js';
import close from '../images/close.svg';
const Banner = () => {
  const [showBanner, setShowBanner] = useLocalStorage('bannerState', true);

  const closeBanner = () => {
    if (showBanner) {
      setShowBanner(false);
    }
  };

  if (showBanner)
    return (
      <div className='flex bg-black text-white px-6 py-3 justify-between'>
        <p className=' text-center font-medium text-lg tracking-wide '>
          This project was made by
          <span className='text-baby-blue underline ml-1'>Ahmed Rizk</span> and
          designed by
          <span className='text-baby-blue underline ml-1'>Codewell</span>
        </p>
        <img
          onClick={closeBanner}
          className='cursor-pointer ml-4'
          src={close}
          alt='Close Banner'
        />
      </div>
    );
  else return null;
};

export default Banner;
