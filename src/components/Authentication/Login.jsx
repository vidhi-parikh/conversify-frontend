/* eslint-disable react/prop-types */
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Input from '../../ui-components/Input';
import Button from '../../ui-components/Button';
import { ChatState } from '../../Context/ChatProvider';
import { useNavigate } from 'react-router-dom';

const Login = ({ setShowSignUp }) => {
  const { setUser } = ChatState();
  const [loginDetail, setLoginDetail] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const authenticateUser = async () => {
    setLoading(true);
    if (!loginDetail?.email) {
      toast.error('Enter email!');
      setLoading(false);
      return;
    }
    if (!loginDetail?.password) {
      toast.error('Enter password!');
      setLoading(false);
      return;
    }

    try {
      console.log('loginDetails', loginDetail);
      let response = await axios.post(
        'http://localhost:4000/api/user/login',
        loginDetail
      );
      toast.success(response?.data?.msg);
      setUser(response.data);
      setLoading(false);
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      navigate('/chat');
    } catch (err) {
      toast.warning(err?.response?.data);
      setLoading(false);
    }
  };

  return (
    <>
      <div className='bg-white flex flex-col p-8 gap-4 w-[25vw] rounded-md shadow-md border-r border'>
        <h3 className='text-center font-bold'> Login to your account </h3>

        <Input
          label='Email'
          name='email'
          type='email'
          value={loginDetail?.email}
          onChange={(e) =>
            setLoginDetail({ ...loginDetail, email: e.target.value })
          }
        />

        <Input
          label='Password'
          name='password'
          type='password'
          value={loginDetail?.password}
          onChange={(e) =>
            setLoginDetail({ ...loginDetail, password: e.target.value })
          }
        />
        <Button type='submit' onClick={authenticateUser} isLoading={loading}>
          Login
        </Button>
        <ToastContainer />
        <div className='flex justify-center'>
          <span
            onClick={() => setShowSignUp((prev) => !prev)}
            className='text-blue-500 underline cursor-pointer hover:cursor-pointer'
          >
            Create Account
          </span>
        </div>
      </div>
    </>
  );
};

export default Login;
