import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import { ChatState } from '../Context/ChatProvider';
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../config/ChatLogic';
import { UserCircleIcon } from '@heroicons/react/24/solid';
const ScrollableChat = ({messages}) => {

    const {user} = ChatState();
    console.log('messages',messages)
  return (
    <ScrollableFeed>
        {messages && messages.map((m, i) => (
            <div className='flex' key = {m._id}> 
                {(isSameSender(messages, m, i, user.userId)
                  || isLastMessage(messages, i, user.userId)
                ) && (
                    <UserCircleIcon className="mt-[7px] mr-1 text-sm cursor-pointer max-w-7" aria-hidden="true" />
                )}
                <span className= {`${m.sender._id === user.userId ? 'bg-[#BEE3F8]' : 'bg-[#B9F5D0]'} rounded-[20px] px-[15px] py-[5px] max-w-[75%]`} style = {{marginLeft:`${isSameSenderMargin(messages, m, i, user.userId)}`, marginTop:`${isSameUser(messages, m, i, user.userId) ? '3px' : '10px'}`}}>
                    {m.content}
                </span>
            </div>
        ))}
    </ScrollableFeed>
  )
}

export default ScrollableChat