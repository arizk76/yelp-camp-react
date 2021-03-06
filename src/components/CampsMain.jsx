import CampsSearch from './CampsSearch';
import { Link } from 'react-router-dom';

const CampsMain = () => {
  return (
    <section className='bg-floral-white mx-6 py-12 px-4 rounded'>
      <h1 className=' text-4xl font-bold '>Welcome to YelpCamp!</h1>
      <p className=' text-lg mt-4 tracking-wide text-gray-500'>
        View our hand-picked campgrounds from all over the world, or add your
        own.
      </p>
      <CampsSearch />
      <p className='mt-4 text-lg underline text-gray-500'>
        <Link to={'/new-campground'}>Or add your own campground</Link>
      </p>
    </section>
  );
};

export default CampsMain;
