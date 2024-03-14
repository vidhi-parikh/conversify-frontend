import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Chatloading from '../components/ChatLoading';
import { getSender } from '../config/ChatLogic';

// eslint-disable-next-line react/prop-types
const MyChats = ({fetchAgain} ) => {
  const [ loggedUser,setLoggedUser ] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  
  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get('http://localhost:4000/api/chat',config);
      setChats(data);
    } catch (error) {
      toast.error('Failed to load the chats',{
        title: 'Error occured!'
      })
    }
  }
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem('userInfo')));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <div className = {`${selectedChat ? 'hidden' : 'flex'} md:flex flex-col items-center p-3 bg-white w-[100%] md:w-[31%] border border-solid border-1 rounded-md`}>
      <div className='pb-3 px-3 flex justify-between item-center w-[100%] font-sans text-base md:text-lg'>
          My Chats
      </div>
      <div className='flex flex-col p-3 bg-gray-100 rounded-md overflow-hidden gap-2 w-full h-full'>
        {
          chats ? (
            chats.map((chat) => (
              <div className={`${selectedChat === chat ? 'bg-[#38B2AC] text-white' : 'bg-[#E8E8E8] text-black'} cursor-pointer px-3 py-2 rounded-lg`} key = {chat._id} onClick={() => setSelectedChat(chat)}> 
                <p> 
                  {getSender(loggedUser,chat.users)} 
                </p>
                {
                  chat.latestMessage && (
                    <p className='text-xs'> <b> {chat.latestMessage.sender.firstName} : </b> 
                      {chat.latestMessage.content.length > 50 
                      ? chat.latestMessage.content.substring(0,51) + '...'
                      : chat.latestMessage.content}
                    </p>
                  )
                }
              </div> 
            ))
          ) : (
            <Chatloading/>
          )
        }
      </div>
      <ToastContainer />
    </div>
  )
}

export default MyChats
