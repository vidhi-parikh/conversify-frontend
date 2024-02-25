import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import react, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Input from '../../ui-components/Input';
import Button from '../../ui-components/Button';

const SignUp = ({setShowSignUp}) => {
  const [userDetails, setUserDetails] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
  });

  const doSignUp = async () => {
    if (!userDetails.firstName) {
      toast.error('Enter firstName');
      return;
    }
    if (!userDetails.lastName) {
      toast.error('Enter lastName');
      return;
    }
    if (!userDetails.email) {
      toast.error('Enter email');
      return;
    }
    if (!userDetails.password) {
      toast.error('Enter password');
      return;
    }
    try {
      const res = await axios.post(
        'http://localhost:4000/sign-up',
        userDetails
      );

      toast.success(res.data.msg);
    } catch (err) {
      toast.warning(err?.response?.data);
    }
  };

  return (
    <>
        <div className='bg-white flex flex-col p-8 gap-4 w-[25vw] rounded-md shadow-md border-r border'>
          <h3 className='text-center font-bold'> Create new Account </h3>

          <Input
            type='text'
            label='First Name'
            name='firstName'
            value={userDetails?.firstName}
            onChange={(e) =>
              setUserDetails({ ...userDetails, firstName: e.target.value })
            }
          />

          <Input
            type='text'
            label='Last Name'
            name='lastName'
            value={userDetails?.lastName}
            onChange={(e) =>
              setUserDetails({ ...userDetails, lastName: e.target.value })
            }
          />

          <Input
            type='text'
            label='Email'
            name='email'
            value={userDetails?.email}
            onChange={(e) =>
              setUserDetails({ ...userDetails, email: e.target.value })
            }
          />

          <Input
            type='password'
            label='Password'
            name='Password'
            value={userDetails?.password}
            onChange={(e) =>
              setUserDetails({ ...userDetails, password: e.target.value })
            }
          />

          <Button type='submit' onClick={doSignUp}>
            {' '}
            Signup{' '}
          </Button>
          <ToastContainer />

          <div className='flex justify-center'>
            <p>
              Already have an account?
             
                <span onClick={() => setShowSignUp((prev) => !prev) } className='text-blue-500 underline'> Log in</span>
             
            </p>
          </div>
        </div>
    </>
  );
};

export default SignUp;
