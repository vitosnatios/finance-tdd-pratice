import { Link, LinkProps } from 'react-router-dom';

const StyledLink = ({ children, ...props }: LinkProps) => {
  return <Link {...props}>{children}</Link>;
};

export default StyledLink;
