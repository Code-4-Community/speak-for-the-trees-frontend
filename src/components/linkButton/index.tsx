import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
// onClick is overwritten

// eslint-disable-next-line
export const LinkButton: React.FC<any> = ({ to, state, children, ...rest }) => {
  return (
    <Button {...rest}>
      <Link to={{ pathname: to, state }}>{children}</Link>
    </Button>
  );
};
