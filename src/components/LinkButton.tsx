import React from 'react';
import { withRouter } from 'react-router';
import { Button } from 'antd';

export const LinkButton = withRouter((props: any) => {
  const {
    history,
    location,
    match,
    staticContext,
    to,
    onClick,
    ...rest
  } = props;
  return (
    <Button
      type="link"
      {...rest}
      onClick={() => {
        history.push(to);
      }}
    />
  );
});
