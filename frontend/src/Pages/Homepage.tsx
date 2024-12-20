import { useEffect } from 'react';
import { useStore } from '../store/useStore';

export const Homepage = () => {
  const { checkAuth, user, logout } = useStore();

  const handleLogout = () => {
    logout();
  }

  const formatDate = (date: string | Date | undefined | null): string => {
    if (!date) return 'N/A';
    const parsedDate = typeof date === 'string' ? new Date(date) : date;
    return `${parsedDate.toLocaleDateString()} ${parsedDate.toLocaleTimeString()}`;
  };

  useEffect(() => {
    checkAuth();
  },[])


  return (<>
    <div className='fixed  rounded-2xl w-[50rem] h-[40rem] bg-white opacity-35'></div>
      <div className='fixed w-[50rem] h-[40rem] flex items-center gap-6'>
        <div className='w-[25rem] h-[25rem] ml-10 bg-slate-50 shadow-lg rounded-2xl'>
          <img className='h-2/5' />
          <div className='text-center'>
            <h4 className='font-bold '>My Profile</h4>
          </div>
          <div className='flex flex-col gap-4 mt-6 ml-4'>
            <div className='flex justify-between px-4'>
              <h4 className='font-semibold '>Name</h4>
              <span>{user?.name}</span>
            </div>
            <div className='flex justify-between px-4'>
              <h4 className='font-semibold '>Email</h4>
              <span>{user?.email}</span>
            </div>
          </div>
          <button onClick={handleLogout} className='w-[12rem] h-[3rem] bg-black text-white rounded-md p-2 ml-28 mt-8'>Logout</button>
        </div>
        <div className='w-[20rem] h-[10rem] bg-slate-50 shadow-lg rounded-2xl'>
          <div className='flex justify-between p-6'>
            <h4>Last Login</h4>
            <span>{formatDate(user?.lastLogin)}</span>
          </div>
          <div className='flex justify-between p-6'>
            <h4>Joined</h4>
            <span>{formatDate(user?.createdAt)}</span>
          </div>
        </div>
      </div>
    </>
  )
}
