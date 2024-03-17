import React from 'react'
import { ChatState } from '../Context/ChatProvider';
import SingleChat from './SingleChat';

const ChatBox = ({fetchAgain, setFetchAgain}) => {
  const { selectedChat } = ChatState();

  console.log('selectedChat',selectedChat)

  return (
    <div className={`${selectedChat ? 'flex-1' : 'hidden'} md:flex flex-col items-center p-3 bg-white w-[100%] md:w-[68%] rounded-lg border border-b-2`}>
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
    </div>
  )
}

export default ChatBox