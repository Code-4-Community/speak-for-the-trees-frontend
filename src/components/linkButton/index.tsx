import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
// onClick is overwritten

// eslint-disable-next-line
export const LinkButton: React.FC<any> = ({
  to,
  state,
  target,
  children,
  ...rest
}) => {
  return (
    <Button {...rest}>
      <Link to={{ pathname: to, state }} target={target}>
        {children}
      </Link>
    </Button>
  );
};
