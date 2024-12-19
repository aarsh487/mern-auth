import { useEffect } from 'react';
import { useStore } from '../store/useStore';

export const Homepage = () => {
  const { checkAuth, user } = useStore();

  useEffect(() => {
    checkAuth();
  },[])


  return (
    <div>
      <h2>Dashboard</h2>
      <div className='w-96 h-72 bg-slate-50 shadow-lg rounded-xl'>
        <img className='h-2/5' />
        <div className='flex justify-between px-4'>
          <h4 className='font-bold '>My Profile</h4>
          <span>{user?.lastLogin ? user?.lastLogin.toLocaleDateString() : 'N/A'}</span>
        </div>
        <div className='flex justify-between px-4'>
          <h4 className='font-bold '>Name</h4>
          <span>{user?.name}</span>
        </div>

      </div>
    </div>
  )
}
