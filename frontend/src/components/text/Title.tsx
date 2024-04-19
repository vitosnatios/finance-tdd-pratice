import { HTMLProps, PropsWithChildren } from 'react';

const Title = ({
  children,
  ...props
}: PropsWithChildren<HTMLProps<HTMLHeadingElement>>) => {
  return (
    <h1 className='text-3xl font-bold text-center' {...props}>
      {children}
    </h1>
  );
};

export default Title;
