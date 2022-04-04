import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Routes } from '../../App';
import { ContentContainer } from '../../components/themedComponents';
import { Typography } from 'antd';

const NotFound: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Not Found</title>
        <meta
          name="description"
          content="The page users are directed to after entering a route that does not exist."
        />
      </Helmet>
      <ContentContainer>
        <Typography.Title>
          Oops! We can't find the page you're looking for.
        </Typography.Title>
        <Link to={Routes.HOME}>
          <Typography.Link>Take me back home!</Typography.Link>
        </Link>
      </ContentContainer>
    </>
  );
};

export default NotFound;
