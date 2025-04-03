'use client';

import { Suspense, useEffect } from 'react';
import Link from 'next/link';
import { useUserStore } from '@/store/user';
import { Loader } from '@/components/ui/loader';
import { UserCard } from '@/components/ui/user-card';

export default function Home() {
  const { loading, users, fetchUsers } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <section className='h-screen flex flex-col items-center pt-10'>
      <div className='w-full sm:w-1/2 md:w-3/5 flex flex-col gap-4'>
        <div className='flex justify-between'>
          <h1 className='text-4xl font-bold text-start'>List of Users</h1>
          <Link href='/create'>
            <button className='px-4 py-2 bg-[#363636] text-white rounded-2xl hover:bg-[#323232] cursor-pointer'>
              Create
            </button>
          </Link>
        </div>
        <Suspense>
          <div className='w-full flex flex-col gap-4'>
            {loading ? (
              <Loader />
            ) : users.length === 0 ? (
              <span className='text-white text-center'>No users found</span>
            ) : (
              users.map(user => <UserCard key={user.id} user={user} />)
            )}
          </div>
        </Suspense>
      </div>
    </section>
  );
}
