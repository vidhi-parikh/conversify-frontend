import { React,useEffect, useRef, useState } from 'react';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../../Context/ChatProvider';
import axios from 'axios';
import ChatLoading from '../ChatLoading';
import UserListItem from '../UserListItem';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const SideDrawer = () => {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const drawerRef = useRef();

  const { user,setSelectedChat,chats,setChats } = ChatState();

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    tippy('[data-tooltip]', {
      placement: 'bottom',
      content: 'Search Users to Chat',
    });

  }, []);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleSearch = async () => {
    if (!search) {
      toast.warning('Please Enter something in search',{
        position: 'bottom-left',
        autoClose: 5000,
      });
      return;
    }
    try {

      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`http://localhost:4000/api/user?name=${search}`,config);
      console.log('data',data)
      if(data.length < 1) {
          toast.warning('User not found!',{
            title:'Error Occured',
            position: 'bottom-left',
            autoClose: 5000,
          });
          return
      }
      setLoading(false);
      setSearchResult(data);
    }
    catch(err) {
        toast.warning('Failed to load the search results',{
        title:'Error Occured',
        position: 'bottom-left',
        autoClose: 5000,
      });
    }
    //closeDrawer();
  }

  const accessChat = async (userId) => {

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post('http://localhost:4000/api/chat', { userId }, config);
      console.log('data',data)


      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      setSelectedChat(data);
      setLoadingChat(false);
      closeDrawer();
    } catch (error) {
      toast.error('Error fetching the chat')
    }
  };

  const handleOutsideClick = (e) => {

    if (drawerRef.current && !drawerRef.current.contains(e.target) && isDrawerOpen && e.target.getAttribute('data-tooltip') !== 'true') {
      setIsDrawerOpen(false);
    }
  };
  
  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isDrawerOpen]);

  return (
    <>
      <div className='flex justify-between items-center bg-white w-[100%] pl-1 pt-2 pr-1 pb-2 border-gray-100 border-8'>
        <button
          data-tooltip
          className='text-black-500 px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-slate-100 bg-opacity-50'
          onClick={handleDrawerToggle}
        >
          <FontAwesomeIcon icon={faSearch} />
          <b> &nbsp;Search User </b>
        </button>
        <p className='font-bold font-sans'> Conversify</p>
        <div className='flex gap-5 flex-row'>
          <Menu as='div' className='relative inline-block text-left top-1'>
            <div>
              <Menu.Button className='inline-flex w-full justify-center gap-x-1.5  px-3 py-2 text-2xl font-semibold  hover:cursor-pointer'>
                <FontAwesomeIcon icon={faBell} />
              </Menu.Button>
            </div>
          </Menu>
          
          <Menu as='div' className='relative inline-block text-left'>
            <div>
              <Menu.Button className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
                <UserCircleIcon className="h-8 w-8 text-gray-400" aria-hidden="true" />
                <ChevronDownIcon
                  className='h-8 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  <div className='py-1'>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={logoutHandler}
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </div>
          </Menu>
        </div>
      </div>
      <div className={`fixed inset-y-0 left-0 min-w-[340px] bg-white border-b-2 transform ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`} ref={drawerRef}>
        <div>
            <div className='w-full border-b-2 pt-4 pl-4'> 
              <h2 className='text-lg font-semibold pb-4'> Search User </h2>
            </div>
            <div className="flex items-start justify-between flex-col px-4 py-2">
                <div className='w-full'> 
                    <input className=' bg-white border-blue-300 border-2 rounded-md p-1 w-[84%]' placeholder='Search by name or email' value={search}
                      onChange={(e) => setSearch(e.target.value)}/> &nbsp;
                    <button className="text-black bg-slate-200 border-blue-300 border-2 rounded-md w-9 p-1 h-9" value = {search} onClick={handleSearch}>Go</button>
                </div>
                <br/> 
                {loading ? (<ChatLoading/>) : (
                  searchResult?.map((user) => (
                    <UserListItem
                          key={user._id}
                          name={user.firstName}
                          email={user.email}
                          handleFunction={() => accessChat(user._id)}
                    />
                  ))
                )}
            </div>
            {loadingChat && <div className='text-black text-center'> <FontAwesomeIcon icon={faSpinner} spin /></div>}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SideDrawer;
