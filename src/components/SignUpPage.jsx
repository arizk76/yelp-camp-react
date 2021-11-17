import { Link } from 'react-router-dom';
import userTestimonial from '../images/userTestimonial.svg';

const SignUpPage = () => {
  return (
    <section className='px-6'>
      <p className='p-2 text-5xl font-bold'>
        Start exploring camps from all over the world.
      </p>
      <form className=' flex flex-col mt-4 mb-8'>
        <label className='text-Makara text-xl py-4 font-semibold'>Email</label>
        <input
          className='px-4 py-6 bg-floral-white text-lg rounded'
          autoComplete='off'
          placeholder='Enter New Email'
          type='email'
        ></input>
        <label className='text-Makara text-xl py-4 font-semibold'>
          Password
        </label>
        <input
          className='px-4 py-6 bg-floral-white text-lg rounded'
          autoComplete='off'
          placeholder='Your Password'
          type='password'
        ></input>
        <label className='text-Makara text-xl py-4 font-semibold'>
          Confirm Password
        </label>
        <input
          className='px-4 py-6 bg-floral-white text-lg rounded'
          autoComplete='off'
          placeholder='Enter Password Again'
          type='password'
        ></input>
        <button className='mt-6 w-full h-20 rounded-md bg-black text-white p-5 font-semibold text-xl tracking-wider'>
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
