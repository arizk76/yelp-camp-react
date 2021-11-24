import { useEffect, useState } from 'react';
import Loading from './Loading';
import { getCamps } from '../utils/firebase/db';
import CampCard from './CampCard';
import CampsMain from './CampsMain';

const CampgroundsPage = () => {
  const [campsList, setCampsList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getCamps().then((camps) => setCampsList(camps));

    setLoading(false);
  }, []);

  return (
    <>
      <CampsMain />
      {loading && (
        <button
          disabled={loading}
          className='relative mt-2 flex justify-between mx-auto w-1/2 items-center text-center h-20 rounded-md bg-black text-white p-5 pl-24 font-semibold text-xl tracking-wider'
        >
          <Loading />
          Loading
        </button>
      )}
      {campsList &&
        campsList.map((camp) => {
          return (
            <CampCard
              key={camp.campId}
              title={camp.description.slice(0, 65)}
              image={camp.image}
              name={camp.name}
              campgroundId={camp.campId}
            />
          );
        })}
    </>
  );
};

export default CampgroundsPage;
