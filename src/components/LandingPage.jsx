import { Link } from 'react-router-dom';
import checkMark from '../images/checkmark.svg';
import heroImgMobile from '../images/Hero_Image_TabletandMobile.jpg';
const LandingPage = () => {
  const heroFeatures = [
    {
      id: 1,
      name: 'Add your own camp suggestions.',
    },
    {
      id: 2,
      name: 'Leave reviews and experiences.',
    },
    {
      id: 3,
      name: 'See locations for all camps.',
    },
  ];
  return (
    <section className='bg-floral-white'>
      <img className='h-96 object-cover' src={heroImgMobile} alt='Hero' />
      <h1 className=' text-4xl mx-6 mt-8 mb-4 font-extrabold'>
        Explore the best camps on Earth.
      </h1>
      <p className='px-6 text-gray-500 text-xl leading-8'>
        YelpCamp is a curated list of the best camping spots on Earth.
        Unfiltered and unbiased reviews.
      </p>
      <ul className='px-6 mt-2 text-gray-600 text-md'>
        {heroFeatures.map((item) => (
          <li key={item.id} className='py-2 flex items-center'>
            <span className='mr-3'>
              <img className=' w-6' src={checkMark} alt='CircleCheck' />
            </span>
            {item.name}
          </li>
        ))}
      </ul>
      <button className='m-6 rounded bg-black text-white p-5 font-semibold'>
        <Link to={'/campgrounds'}>View Campgrounds</Link>
      </button>
      <p className='px-6 pt-2 text-gray-500 text-md font-semibold'>
        Partnered with:
      </p>
      <div className='px-6 flex justify-between pb-8 pt-2'>
        <img className='w-1/3' src='images/airbnb.svg' alt='airbnb' />
        <img className='w-1/3' src='images/booking.svg' alt='Booking.com' />
        <img className='w-1/3' src='images/plum_guide.svg' alt='Plum Guide' />
      </div>
    </section>
  );
};

export default LandingPage;
