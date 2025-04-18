import Link from 'next/link';
import { CiUser } from 'react-icons/ci';
import { useUserStore } from '@/store/user';

interface UserCardProps {
  user: {
    id: string;
    name: string;
    email: string;
    age: number;
  };
}

export const UserCard = ({ user }: UserCardProps) => {
  const { deleteUser } = useUserStore();

  const handleDelete = (userId: string) => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this user?',
    );
    if (isConfirmed) {
      deleteUser(userId);
    }
  };

  return (
    <div className='w-full flex flex-col gap-2 sm:flex-row justify-between border rounded-3xl border-[#323232] p-4'>
      <Link href={`/user/${user.id}`}>
        <div className='flex gap-4'>
          <div className='w-12 h-12 rounded-full flex items-center justify-center'>
            <CiUser size={24} />
          </div>
          <div>
            <h2 className='text-2xl'>{user.name}</h2>
            <div>Email: {user.email}</div>
            <div>Age: {user.age}</div>
          </div>
        </div>
      </Link>
      <div className='flex items-start gap-2'>
        <Link href={`/edit/${user.id}`}>
          <button className='px-4 py-2 bg-[#363636] text-white rounded-2xl hover:bg-[#323232] cursor-pointer'>
            Edit
          </button>
        </Link>
        <button
          onClick={() => handleDelete(user.id)}
          className='px-4 py-2 bg-[#363636] text-white rounded-2xl hover:bg-[#323232] cursor-pointer'
        >
          Delete
        </button>
      </div>
    </div>
  );
};
