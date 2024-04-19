import { HTMLProps } from 'react';

const Input = ({ ...props }: HTMLProps<HTMLInputElement>) => {
  return (
    <input
      className='text-stone-900 w-full px-3 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500'
      {...props}
    />
  );
};

export default Input;
