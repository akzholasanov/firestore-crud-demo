'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { CiUser } from 'react-icons/ci';
import { useUserStore } from '@/store/user';

export default function User() {
  const { id } = useParams();
  const { user, fetchUserById } = useUserStore();

  useEffect(() => {
    if (id) {
      fetchUserById(id as string);
    }
  }, [id, fetchUserById]);

  return (
    <section className='h-screen flex flex-col items-center pt-10'>
      <div className='w-full sm:w-1/2 md:w-3/5 flex flex-col gap-4'>
        <h1 className='text-4xl font-bold text-start'>Detail of User</h1>
        <div className='w-full flex flex-col gap-4'>
          {user ? (
            <div className='w-full flex justify-between border rounded-2xl border-[#323232] p-4'>
              <div className='flex gap-4'>
                <div className='w-12 h-12 rounded-full bg-[#363636] flex items-center justify-center'>
                  <CiUser size={24} />
                </div>
                <div>
                  <h2 className='text-2xl'>{user?.name}</h2>
                  <div>Email: {user?.email}</div>
                  <div>Age: {user?.age}</div>
                </div>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </section>
  );
}
