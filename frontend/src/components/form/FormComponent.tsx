import { HTMLProps, PropsWithChildren } from 'react';

const FormComponent = ({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLProps<HTMLFormElement>>) => {
  return (
    <form
      className={`bg-gray-800 text-white rounded-md p-4 shadow-md flex flex-col gap-4 max-w-screen-sm ${className}`}
      {...props}
    >
      {children}
    </form>
  );
};

export default FormComponent;
