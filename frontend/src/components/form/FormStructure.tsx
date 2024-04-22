import { PropsWithChildren } from 'react';
import FormComponent from './FormComponent';
import Title from '../text/Title';
import { ClipLoader } from 'react-spinners';
import Button from './Button';
import StyledLink from '../text/StyledLink';
import Error from '../text/Error';

type Props = {
  loading: boolean;
  title: string;
  error: string | null;
  buttonText: string;
  linkText: string;
  linkUrl: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

const FormStructure = ({
  children,
  loading,
  error,
  title,
  buttonText,
  linkText,
  linkUrl,
  handleSubmit,
}: PropsWithChildren<Props>) => {
  return (
    <FormComponent onSubmit={handleSubmit} aria-label='login-form'>
      <Title aria-label='form-title'>{title}</Title>
      {children}
      <div className='flex flex-col-reverse gap-4 sm:flex-row items-center justify-between'>
        {loading ? (
          <ClipLoader color='#3b82f6' size='35px' />
        ) : (
          <Button type='submit' aria-label='submit-button'>
            {buttonText}
          </Button>
        )}
        <StyledLink to={linkUrl} aria-label='form-link'>
          {linkText}
        </StyledLink>
      </div>
      {error && <Error>{error}</Error>}
    </FormComponent>
  );
};

export default FormStructure;
