import { HTMLProps, PropsWithChildren } from 'react';

const Error = ({
  children,
  ...props
}: PropsWithChildren<HTMLProps<HTMLParagraphElement>>) => {
  return (
    <div className='bg-red-600 text-white rounded-md p-4 shadow-md self-start'>
      <p className='text-sm font-medium' {...props}>
        {children}
      </p>
    </div>
  );
};

export default Error;
