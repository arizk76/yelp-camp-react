import { useState, useRef } from 'react';
import { useFireAuth } from '../utils/firebase/fireAuth';
import { Navigate, useNavigate } from 'react-router-dom';
import Toast from './Toast';
import upload from '../images/upload.svg';
import { useFireStorage } from '../utils/firebase/fireStorage';
import { addCamp } from '../utils/firebase/db';
import Loading from './Loading';

const NewCampgroundPage = () => {
  const { user, name } = useFireAuth();
  const { progress, imageURL, uploadError, uploadImage } = useFireStorage();
  let navigate = useNavigate();
  let currentUser = user;

  const [toast, setToast] = useState({ type: '', message: '' });
  const [selectedImage, setSelectedImage] = useState({});
  const [loading, setLoading] = useState(false);
  const selectedImageTypes = ['image/png', 'image/jpeg'];
  const campNameRef = useRef();
  const campPriceRef = useRef();
  const campDescriptionRef = useRef();

  const handleUploadImage = async (evt) => {
    let selected = evt.target.files[0];

    if (!campNameRef.current.value) {
      setSelectedImage({});
      return setToast({
        type: 'warning',
        message: 'Please enter campground name first.',
      });
    } else if (!selectedImageTypes.includes(selected.type)) {
      setSelectedImage({});
      return setToast({
        type: 'warning',
        message: 'Only accept images of types png or jpeg',
      });
    } else if (selected) {
      setToast({});
      setSelectedImage(selected);

      try {
        await uploadImage(selected, campNameRef.current.value);

        if (imageURL !== '') {
          return setToast({
            type: 'success',
            message: 'Image uploaded successfully..!!',
          });
        }
      } catch (err) {
        console.error(err);
        return setToast({
          type: 'error',
          message: uploadError,
        });
      }
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      setLoading(true);
      await addCamp(
        campNameRef.current.value,
        campPriceRef.current.value,
        imageURL,
        campDescriptionRef.current.value,
        name
      );
      setLoading(false);
      navigate(-1);
    } catch {}
  };

  if (!currentUser) {
    return (
      <>
        <Navigate to='/sign-in' />
      </>
    );
  }

  return (
    <>
      <section className='mx-6 py-12 rounded text-Makara'>
        <h1 className='text-black text-5xl font-bold '>Add New Campground</h1>
        <form onSubmit={handleSubmit} className=' flex flex-col my-8'>
          <label className=' text-xl py-4 font-semibold'>
            Campground Name
            <input
              className='mt-4 px-4 py-6 bg-floral-white text-lg rounded w-full'
              autoComplete='off'
              placeholder='Seven Sisters Waterfall'
              required
              type='text'
              ref={campNameRef}
            />
          </label>

          <label className=' text-xl py-4 flex flex-col font-semibold'>
            Price
            <input
              className='mt-4 px-4 py-6 bg-floral-white text-lg rounded'
              autoComplete='off'
              placeholder='$149'
              required
              type='text'
              ref={campPriceRef}
            />
          </label>
          <p className='  text-xl py-4 font-semibold'>Image</p>
          <label className=' bg-floral-white rounded text-xl py-4 cursor-pointer font-semibold tracking-wide flex items-center'>
            <img className='w-9 ml-4' src={upload} alt='Search' />
            <span className='ml-12 text-base leading-normal'>
              Select image to upload
            </span>

            <input
              type='file'
              accept='image/png, image/jpeg'
              className='hidden'
              onChange={handleUploadImage}
            />
          </label>
          <p className='text-md pb-4 pt-2 font-semibold'>
            Selected Image:
            <span className='ml-3 font-normal '>{selectedImage.name}</span>
          </p>
          {progress > 0 && progress < 100 ? (
            <p className='text-xl pb-4 pt-2 font-semibold'>
              Upload Status: {progress.toFixed()} %
            </p>
          ) : null}
          {progress === 100 && (
            <Toast type='success' message='Image Uploaded Successfully' />
          )}

          <Toast type={toast.type} message={toast.message} />
          <label className='mt-6 text-xl py-4 font-semibold'>
            Description
            <textarea
              className=' mt-4 w-full px-4 py-6 bg-floral-white text-lg rounded'
              autoComplete='off'
              rows='12'
              placeholder='The Seven Sisters is the 39th tallest waterfall in Norway. The 410-metre (1,350 ft) tall waterfall consists of seven separate streams, and the tallest of the seven has a free fall that measures 250 metres (820 ft). The waterfall is located along the Geirangerfjorden in Stranda Municipality in Møre og Romsdal county, Norway. The waterfall is located just south of the historic Knivsflå farm, across the fjord from the old Skageflå farm. The falls are about 6.5 kilometres (4.0 mi) west of the village of Geiranger.'
              type='text'
              required
              ref={campDescriptionRef}
            />
          </label>

          <button className=' relative mt-6 w-full h-20 rounded-md bg-black text-white p-5 font-semibold text-xl tracking-wider'>
            {loading && <Loading />}
            Add Campground
          </button>
        </form>
      </section>
    </>
  );
};

export default NewCampgroundPage;
