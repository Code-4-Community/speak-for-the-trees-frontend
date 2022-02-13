import React from 'react';
import { Redirect } from 'react-router';
import { Routes } from '../../App';

interface AuthRedirectProps {
  readonly from: string;
}

const AuthRedirect: React.FC<AuthRedirectProps> = ({ from }) => {
  return (
    <Redirect
      from={from}
      to={{
        pathname: Routes.LOGIN,
        state: {
          destination: from,
        },
      }}
    />
  );
};

export default AuthRedirect;
