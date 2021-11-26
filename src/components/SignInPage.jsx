import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFireAuth } from '../utils/firebase/fireAuth';
import userTestimonial from '../images/userTestimonial.svg';
import Toast from './Toast.jsx';
import Loading from './Loading';

const SignInPage = () => {
  const [toast, setToast] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const { fireSignIn } = useFireAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  let navigate = useNavigate();

  const handleSignIn = async (evt) => {
    evt.preventDefault();

    try {
      setLoading(true);
      await fireSignIn(emailRef.current.value, passwordRef.current.value);
      setLoading(false);
      setToast({
        type: 'success',
        message: 'User logged-in successfully!.',
      });
    } catch (error) {
      setLoading(false);
      return setToast({
        type: 'error',
        message: error.code,
      });
    }
    navigate(-1);
  };
  return (
    <section className='px-6'>
      <p className='p-2 text-5xl font-bold'>
        Start exploring camps from all over the world.
      </p>
      <form onSubmit={handleSignIn} className=' flex flex-col mt-4 mb-8'>
        <label className='text-Makara text-xl py-4 font-semibold'>Email</label>
        <input
          className='px-4 py-6 bg-floral-white text-lg rounded'
          autoComplete='off'
          placeholder='Enter Your Email'
          type='email'
          ref={emailRef}
        ></input>
        <label className='text-Makara text-xl py-4 font-semibold'>
          Password
        </label>
        <input
          className='px-4 py-6 bg-floral-white text-lg rounded'
          autoComplete='off'
          placeholder='Your Password'
          type='password'
          ref={passwordRef}
        ></input>
        <Toast type={toast.type} message={toast.message} />
        <button
          type='submit'
          className='relative mt-6 w-full h-20 rounded-md bg-black text-white p-5 font-semibold text-xl tracking-wider'
        >
          {loading && <Loading />}
          Login
        </button>
      </form>
      <p className=' text-Makara font-medium text-lg tracking-wide '>
        Not a user yet?
        <span className='text-baby-blue underline ml-1 font-bold'>
          <Link to='/sign-up'>Create an account</Link>
        </span>
      </p>
      <div className=' px-2 py-8 bg-floral-white rounded-md mt-8'>
        <p className='px-4 text-2xl font-bold leading-relaxed'>
          "YelpCamp has honestly saved me hours of research time, and the camps
          on here are definitely will picked and added."
        </p>
        <div className='flex mx-4 mt-8'>
          <img className='' src={userTestimonial} alt='UserTestimonial' />
          <div className='ml-4  '>
            <p className='font-bold'>May Andrews</p>
            <p>Professional Hiker</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInPage;
