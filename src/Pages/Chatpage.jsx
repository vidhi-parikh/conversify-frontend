import { useEffect, useState } from 'react';
import { ChatState } from '../Context/ChatProvider';
import SideDrawer from '../components/miscellaneous/SideDrawer';
import { useNavigate } from 'react-router-dom';
const ChatPage = () => {

  const { user } = ChatState();
  let navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (!user) navigate('/');
  }, [navigate]);
  return (
    <div className="w-full h-screen flex flex-col">
      {user && <SideDrawer />}
    </div>
  );
};

export default ChatPage;
