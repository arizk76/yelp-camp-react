import { useParams } from 'react-router-dom';
import { campgroundsData, reviews } from '../utils/staticDB/campsData.js';
import chatImage from '../images/chatBubble.svg';
const CampgroundPage = () => {
  let params = useParams();
  let currentCamp,
    currentReviews = [];

  campgroundsData.forEach((campground) => {
    if (campground.campgroundId === params.campgroundId) {
      currentCamp = campground;
    }
  });

  reviews.forEach((review) => {
    if (review.campgroundId === params.campgroundId) {
      currentReviews.push(review);
    }
  });

  return (
    <>
      <section className='mx-6 my-12 p-8 rounded-md shadow border-2'>
        <img
          className='rounded-md mb-8 w-full'
          src={currentCamp.image}
          alt={currentCamp.name}
        />
        <div className='flex justify-between items-center'>
          <h1 className='font-bold text-2xl'>{currentCamp.name}</h1>
          <h1 className='text-xl'>${currentCamp.price}/night</h1>
        </div>
        <p className='text-Makara my-8 text-xl leading-relaxed'>
          {currentCamp.description}
        </p>
        <p className='text-Makara text-xl italic mb-6'>
          Submitted By {currentCamp.submittedBy}
        </p>
      </section>
      <section className='mx-6 my-12 p-8 rounded-md shadow border-2'>
        {currentReviews.map((review) => (
          <div key={review.id} className='mb-8'>
            <div className='flex justify-between items-center'>
              <h1 className='font-bold text-xl'>{review.userName}</h1>
              <h1 className='text-lg'>{review.createdAt}</h1>
            </div>
            <p className='text-Makara my-8 text-xl leading-relaxed pb-4 border-b-2'>
              {review.description}
            </p>
          </div>
        ))}
        <button className='flex justify-around w-2/3 items-center mt-3 h-20 rounded-md bg-black text-white p-5 font-semibold text-xl tracking-wider'>
          <img src={chatImage} alt='Leave a review' /> Leave a Review
        </button>
      </section>
      <div className='mx-6 my-12 p-8 rounded-md shadow border-2 '>
        <img className='w-full rounded-md' src={currentCamp.map} alt='Map' />
      </div>
    </>
  );
};

export default CampgroundPage;
