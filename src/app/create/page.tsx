'use client';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { FormData } from '@/types/common';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/user';
import { yupResolver } from '@hookform/resolvers/yup';
import { validateDigitInput } from '@/helpers/validateDigitInput';

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    age: yup.number().positive().integer().required(),
  })
  .required();

export default function Create() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const { loading, addUser } = useUserStore();

  const onSubmit = async (data: FormData) => {
    await addUser(data);
    router.push('/');
  };

  return (
    <section className='h-screen flex flex-col items-center pt-10'>
      <div className='w-full sm:w-1/2 md:w-3/5 flex flex-col gap-4'>
        <h1 className='text-4xl font-bold text-start'>Create user</h1>
        <form
          className='w-full flex flex-col gap-4'
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor='name' className='flex flex-col gap-2'>
            Name
            <input
              type='text'
              {...register('name')}
              className='border rounded-2xl border-[#323232] outline-none p-2 pl-4'
            />
            <p className='text-red-500'>{errors.name?.message}</p>
          </label>
          <label htmlFor='email' className='flex flex-col gap-2'>
            Email
            <input
              type='text'
              {...register('email')}
              className='border rounded-2xl border-[#323232] outline-none p-2 pl-4'
            />
            <p className='text-red-500'>{errors.email?.message}</p>
          </label>
          <label htmlFor='age' className='flex flex-col gap-2'>
            Age
            <input
              type='number'
              pattern='\d*'
              inputMode='numeric'
              {...register('age')}
              onKeyDown={validateDigitInput}
              className='border rounded-2xl border-[#323232] outline-none p-2 pl-4 appearance-none'
            />
            <p className='text-red-500'>{errors.age?.message}</p>
          </label>
          <button
            type='submit'
            className='px-4 py-2 bg-[#363636] text-white rounded-2xl hover:bg-[#323232] cursor-pointer'
          >
            {loading ? '...loading' : 'Create'}
          </button>
        </form>
      </div>
    </section>
  );
}
