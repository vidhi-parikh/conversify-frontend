// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getSender } from '../config/ChatLogic';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import io from 'socket.io-client';
import Lottie from 'react-lottie';
import { ChatState } from '../Context/ChatProvider';
import ScrollableChat from './ScrollableChat';
import animationData from '../animations/typing.json'
import './styles.css';
import 'react-toastify/dist/ReactToastify.css';


const ENDPOINT = 'http://localhost:4000';
var socket, selectedChatCompare;

const SingleChat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false)
  const [isTyping,setIsTyping] = useState(false);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const { user, selectedChat, setSelectedChat} = ChatState();

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:4000/api/message/${selectedChat._id}`,
        config
      );

      setMessages(data);
      setLoading(false);

      socket.emit('join chat', selectedChat._id);
    } catch (err) {
      toast.error('Failed to load Messages');
    }
  };

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat]);

  const sendMessage = async (event) => {
    if (event.key === 'Enter' && newMessage) {
      socket.emit('stop typing',selectedChat._id)
      event.preventDefault();
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.post(
          'http://localhost:4000/api/message',
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );

        setNewMessage('');

        socket.emit('new message',data)
        setMessages([...messages, data]);

      } catch (err) {
        toast.error('Failed to send the message');
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('setup', user);
    socket.on('connected', () => setSocketConnected(true));
    socket.on('typing',() => setIsTyping(true))
    socket.on('stop typing',() => setIsTyping(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on('message received',(newMessageReceived) => {
        if(!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
         /* notification logic */
        } else {
            setMessages([...messages,newMessageReceived]);
        }
    })
  })



  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if(!socketConnected) return;

    if(!typing) {
        setTyping(true)
        socket.emit('typing',selectedChat._id);
    }
    let lastTypinTime = new Date().getTime()
    var timerLength = 3000;
    setTimeout(() => {
        var timeNow = new Date().getTime();
        var timeDiff = timeNow - lastTypinTime;

        if(timeDiff >= timerLength && typing) {
            socket.emit('stop typing',selectedChat._id);
            setTyping(false)
        }
    },timerLength)
  };

  return (
    <>
      {selectedChat ? (
        <>
          <p className='text-2xl md:text-3xl pb-3 w-full font-sans flex justify-between items-start'>
            <FontAwesomeIcon
              className='flex bg-slate-300 px-2 py-1 text-sm cursor-pointer md:hidden'
              onClick={() => setSelectedChat('')}
              icon={faArrowLeft}
            />
            <>{getSender(user, selectedChat.users)}</>
          </p>
          <div className='flex flex-col justify-end p-3 bg-[#E8E8E8] w-full h-full rounded-lg overflow-hidden'>
            {loading ? (
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                className='text-blue-500 text-lg w-20 h-20 self-center m-auto'
              />
            ) : (
              <div className='messages'>
                <ScrollableChat messages={messages} />
              </div>
            )}
            <form onKeyDown={sendMessage} className='mt-3'>
              {isTyping ? <div> 
                <Lottie width={70} options={defaultOptions} style={{alignContent:'baseline', marginBottom: 15, marginLeft:0}}></Lottie>
              </div> : (<></>)}
              <input
                className='bg-[#E0E0E0] border p-2 focus:border-blue-500 focus:outline-none filled-input w-full'
                placeholder='Enter a message ..'
                type='text'
                onChange={typingHandler}
                value={newMessage}
              />
            </form>
          </div>
        </>
      ) : (
        <div className='flex items-center justify-center h-full'>
          <p className='text-3xl pb-3 font-sans'>
            Click on a user to start chatting
          </p>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default SingleChat;
