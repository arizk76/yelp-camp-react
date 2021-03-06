import { Link } from 'react-router-dom';

const CampCard = ({ name, title, image, campgroundId }) => {
  return (
    <div className='rounded-lg m-6 py-6 px-4 flex flex-col border-2'>
      <img className=' rounded-md max-h-56 ' src={image} alt={name} />

      <div className='p-4'>
        <h2 className='text-xl font-semibold mb-2'>{name}</h2>

        <p className='mb-4 text-Makara text-lg'>{title}</p>
      </div>
      <button
        className='
        font-bold
        border-2
        p-4
        rounded
        text-lg
      '
        type='button'
      >
        <Link to={campgroundId}>View Campground</Link>
      </button>
    </div>
  );
};

export default CampCard;
