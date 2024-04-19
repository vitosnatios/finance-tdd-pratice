import { HTMLProps, PropsWithChildren } from 'react';

const Label = ({
  children,
  ...props
}: PropsWithChildren<HTMLProps<HTMLLabelElement>>) => {
  return (
    <label className='block text-sm font-medium' {...props}>
      {children}
    </label>
  );
};

export default Label;
