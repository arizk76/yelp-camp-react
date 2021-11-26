import { useEffect, useState } from 'react';
import moment from 'moment';
import { Link, useParams } from 'react-router-dom';
import { getCamp, getReviews } from '../utils/firebase/db';
import map from '../images/campMap.png';
import chatImage from '../images/chatBubble.svg';

const CampgroundPage = () => {
  const [currentCamp, setCurrentCamp] = useState({});
  const [currentReviews, setCurrentReviews] = useState([]);
  let params = useParams();

  useEffect(() => {
    getCamp(params.campgroundId).then((camp) => setCurrentCamp(camp));
    getReviews(params.campgroundId).then((reviews) =>
      setCurrentReviews(reviews)
    );
  }, [params.campgroundId]);

  return (
    <>
      {currentCamp && (
        <section className='mx-6 my-12 p-8 rounded-md shadow border-2'>
          <img
            className='rounded-md mb-8 w-full'
            src={currentCamp.image}
            alt={currentCamp.name}
          />
          <div className='flex justify-between items-center'>
            <h1 className='font-bold text-xl'>{currentCamp.name}</h1>
            <h1 className='text-lg'>${currentCamp.price}/night</h1>
          </div>
          <p className='text-Makara my-8 text-lg leading-relaxed'>
            {currentCamp.description}
          </p>
          <p className='text-Makara text-lg italic mb-2'>
            Submitted By : {currentCamp.submittedBy}
          </p>
        </section>
      )}

      <section className='mx-6 my-12 p-8 rounded-md shadow border-2'>
        {currentReviews.map((review) => (
          <div key={review.createdAt} className='mb-8'>
            <div className='flex justify-between items-center'>
              <h1 className='font-bold text-lg'>{review.submittedBy}</h1>
              <h1 className='text-md'>
                {moment(
                  `${review.createdAt}`,
                  'MMMM Do YYYY, h:mm:ss a'
                ).fromNow()}
              </h1>
            </div>
            <p className='text-Makara my-8 text-lg leading-relaxed pb-4 border-b-2'>
              {review.description}
            </p>
          </div>
        ))}
        <button className='flex justify-around w-2/3 items-center mt-3 h-20 rounded-md bg-black text-white p-5 font-semibold text-lg tracking-wider'>
          <img src={chatImage} alt='Leave a review' />
          <Link to='new-comment'>Leave a Review</Link>
        </button>
      </section>
      <div className='mx-6 my-12 p-8 rounded-md shadow border-2 '>
        <img className='w-full rounded-md' src={map} alt='Map' />
      </div>
    </>
  );
};

export default CampgroundPage;
