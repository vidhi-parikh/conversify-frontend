import { useEffect, useState } from 'react';
import { ChatState } from '../Context/ChatProvider';
import SideDrawer from '../components/miscellaneous/SideDrawer';
import { useNavigate } from 'react-router-dom';
import MyChats from '../components/MyChats';
import ChatBox from '../components/ChatBox';
const ChatPage = () => {

  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false); 
  let navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (!user) navigate('/');
  }, [navigate]);
  return (
    <div className="w-full h-screen flex flex-col">
      {user && <SideDrawer />}
      <div className='flex-grow flex gap-7 w-[100%] p-3'>
        {user && <MyChats fetchAgain={fetchAgain}/>}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      </div>
    </div>
  );
};

export default ChatPage;