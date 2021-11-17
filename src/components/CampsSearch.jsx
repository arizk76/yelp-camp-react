const CampsSearch = () => {
  return (
    <>
      <div className='relative text-gray-600 focus-within:text-gray-400 mt-3'>
        <span className='absolute inset-y-0 left-0 flex items-center pl-4 '>
          <button
            type='submit'
            className='p-1 focus:outline-none focus:shadow-outline'
          >
            <img className=' w-5' src='images/search_icon.svg' alt='Search' />
          </button>
        </span>
        <input
          placeholder='Search for camps'
          type='search'
          className=' border-gray-400 border-solid border-opacity-50 border-2 w-full h-20 py-2 text-xl rounded-md pl-16 focus:outline-none focus:bg-white focus:text-gray-900'
          autoComplete='off'
        />
      </div>
      <button className=' mt-3 w-full h-20 rounded-md bg-black text-white p-5 font-semibold text-xl tracking-wider'>
        Search
      </button>
    </>
  );
};
export default CampsSearch;
