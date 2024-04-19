import { HTMLProps, PropsWithChildren } from 'react';

const Button = ({
  children,
  type = 'button',
  ...props
}: PropsWithChildren<HTMLProps<HTMLButtonElement>> & {
  type: 'button' | 'submit' | 'reset' | undefined;
}) => {
  return (
    <button
      className='disabled:opacity-50 bg-indigo-600 text-white hover:bg-indigo-700 font-medium rounded-md px-4 py-2 disabled:cursor-not-allowed'
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
