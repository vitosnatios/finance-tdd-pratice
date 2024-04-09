import React from 'react';

type Props = { authenticated: boolean };

const NavLinks = ({ authenticated }: Props) => {
  console.log(authenticated);

  return <div>NavLinks</div>;
};

export default NavLinks;
