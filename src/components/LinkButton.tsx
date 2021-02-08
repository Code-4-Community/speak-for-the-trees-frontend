import React from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
// onClick is overwritten

export const LinkButton: React.FC<any> = ({ to, ...rest }) => {
  const history = useHistory();

  return (
    <Button
      {...rest}
      onClick={() => {
        history.push(to);
      }}
    />
  );
};
