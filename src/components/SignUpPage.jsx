import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFireAuth } from '../utils/firebase/fireAuth';
import { getUserName } from '../utils/firebase/db';
import { addUser } from '../utils/firebase/db';
import userTestimonial from '../images/userTestimonial.svg';
import Toast from './Toast.jsx';
import Loading from './Loading';

const SignUpPage = () => {
  const [toast, setToast] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const { fireSignUp, setName } = useFireAuth();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  let navigate = useNavigate();

  const handleSignUp = async (evt) => {
    evt.preventDefault();
    let password = passwordRef.current.value;
    let confirmPassword = passwordConfirmRef.current.value;
    let email = emailRef.current.value;
    let name = nameRef.current.value;

    try {
      if (password !== confirmPassword) {
        return setToast({ type: 'error', message: 'Passwords do not match' });
      } else if (password.length < 6) {
        return setToast({
          type: 'error',
          message: 'Password length should be 6 characters at least',
        });
      }

      setLoading(true);
      setToast({ type: '', message: '' });
      const currentUser = await fireSignUp(email, password);
      await addUser(currentUser.auth.currentUser.uid, name, email);
      const userName = await getUserName(emailRef.current.value);
      setName(userName);
      setLoading(false);
      setToast({
        type: 'success',
        message: 'Congratulations, User created successfully!.',
      });
    } catch (error) {
      return setToast({
        type: 'error',
        message: error.message,
      });
    }
    navigate(-1);
  };

  return (
    <section className='px-6'>
      <p className='p-2 text-5xl font-bold'>
        Start exploring camps from all over the world.
      </p>
      <form className=' flex flex-col mt-4 mb-8' onSubmit={handleSignUp}>
        <label className='text-Makara text-xl py-4 font-semibold'>Name</label>
        <input
          className='px-4 py-6 bg-floral-white text-lg rounded'
          autoComplete='off'
          placeholder='Enter Your Name'
          type='text'
          ref={nameRef}
        ></input>
        <label className='text-Makara text-xl py-4 font-semibold'>Email</label>
        <input
          className='px-4 py-6 bg-floral-white text-lg rounded'
          autoComplete='off'
          placeholder='Enter New Email'
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
        <label className='text-Makara text-xl py-4 font-semibold'>
          Confirm Password
        </label>
        <input
          className='px-4 py-6 bg-floral-white text-lg rounded'
          autoComplete='off'
          placeholder='Enter Password Again'
          type='password'
          ref={passwordConfirmRef}
        ></input>
        {/* {visible && <Toast type={toast.type} message={toast.message} />} */}
        <Toast type={toast.type} message={toast.message} />{' '}
        <button
          disabled={loading}
          type='submit'
          className='relative group-hover:mt-6 w-full h-20 rounded-md bg-black text-white p-5 font-semibold text-xl tracking-wider'
        >
          {loading && <Loading />}
          Create an account
        </button>
      </form>
      <p className=' text-Makara font-medium text-lg tracking-wide '>
        Already a user?
        <span className='text-baby-blue underline ml-1 font-bold'>
          <Link to='/sign-in'> Sign in </Link>
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

export default SignUpPage;
