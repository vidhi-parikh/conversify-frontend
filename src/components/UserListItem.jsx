import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import React from 'react'

// eslint-disable-next-line react/prop-types
const UserListItem = ({name,email,handleFunction}) => {


  return (
    <div>

      <div className="flex items-center min-w-[340px] px-3 py-2 mb-2 text-sm rounded-lg w-full bg-[#E8E8E8] cursor-pointer hover:text-white hover:bg-[#38B2AC] text-black" onClick={handleFunction}>
        <UserCircleIcon className="h-12 w-12 pr-4" aria-hidden="true" />
        <div className='flex flex-col text-xs'>
            <span className="font-semibold text-sm">{name}</span>
            <span className="text-xs"><b> Email </b> { email }</span>
        </div>
      </div> 

    </div>
  )
}

export default UserListItem
