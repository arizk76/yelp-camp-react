import { useRef, useState } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { useFireAuth } from '../utils/firebase/fireAuth';
import { addReview } from '../utils/firebase/db';
import Loading from './Loading';

const NewCommentPage = () => {
  const [loading, setLoading] = useState(false);
  const { user, name } = useFireAuth();
  const reviewRef = useRef();
  let navigate = useNavigate();
  let currentUser = user;
  let { campgroundId } = useParams();

  const handleAddReview = async (evt) => {
    evt.preventDefault();
    try {
      setLoading(true);
      await addReview(campgroundId, name, reviewRef.current.value);
      setLoading(false);
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };

  if (!currentUser) {
    return (
      <>
        <Navigate to='/sign-in' replace />
      </>
    );
  }

  return (
    <>
      <section className='mx-6 py-12 rounded text-Makara'>
        <h1 className='text-black text-4xl font-bold '>Add New Comment</h1>

        <form onSubmit={handleAddReview} className=' flex flex-col my-8'>
          <label className='mt-6 text-xl py-4 font-semibold'>
            Description
            <textarea
              className=' mt-4 w-full p-6 bg-floral-white text-lg rounded'
              autoComplete='off'
              rows='8'
              placeholder='This was probably the best camp i have visited in the past year. definitely recommended and you must do it to enjoy the view.'
              type='text'
              ref={reviewRef}
            />
          </label>

          <button className='relative mt-6 w-full h-20 rounded-md bg-black text-white p-5 font-semibold text-xl tracking-wider'>
            {loading && <Loading />}
            Post comment
          </button>
        </form>
      </section>
    </>
  );
};

export default NewCommentPage;
