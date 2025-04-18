'use client';

import * as yup from 'yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormData } from '@/types/common';
import { useUserStore } from '@/store/user';
import { validateDigitInput } from '@/helpers';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams, useRouter } from 'next/navigation';

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    age: yup.number().positive().integer().required(),
  })
  .required();

export default function Edit() {
  const { id } = useParams();
  const router = useRouter();
  const { user, loading, updateUser, fetchUserById } = useUserStore();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (id) {
      fetchUserById(id as string);
    }
  }, [id, fetchUserById]);

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('email', user.email);
      setValue('age', user.age);
    }
  }, [user, setValue]);

  const onSave = async (data: FormData) => {
    if (id) {
      await updateUser(id as string, data);
      router.push('/');
    }
  };

  return (
    <section className='h-screen flex flex-col items-center pt-10'>
      <div className='w-full sm:w-1/2 md:w-3/5 flex flex-col gap-4'>
        <h1 className='text-4xl font-bold text-start'>Edit User</h1>
        <form
          className='w-full flex flex-col gap-4'
          onSubmit={handleSubmit(onSave)}
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
              inputMode='numeric'
              {...register('age')}
              onKeyDown={validateDigitInput}
              className='border rounded-2xl border-[#323232] outline-none p-2 pl-4'
            />
            <p className='text-red-500'>{errors.age?.message}</p>
          </label>
          <button
            type='submit'
            className='px-4 py-2 bg-[#363636] text-white rounded-2xl hover:bg-[#323232] cursor-pointer'
          >
            {loading ? '...loading' : 'Save'}
          </button>
        </form>
      </div>
    </section>
  );
}
