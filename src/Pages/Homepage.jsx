// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Authentication/Login';
import SignUp from '../components/Authentication/Signup';

const HomePage = () => {
  let navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));

    if (user) navigate('/chat');
  }, [navigate]);

  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <div className='flex flex-col items-center max-xl:w-0'>
      <div className='flex flex-grow bg-white w-[25vw] p-4 rounded-md shadow-md mt-10 ml-0 mb-4 mr-0 justify-center border-r border'>
        <h2 className='font-semibold font-custom'> Conversify </h2>
      </div>
      {showSignUp == true ? (
        <SignUp setShowSignUp={setShowSignUp} />
      ) : (
        <Login setShowSignUp={setShowSignUp} />
      )}
    </div>
  );
};

export default HomePage;
