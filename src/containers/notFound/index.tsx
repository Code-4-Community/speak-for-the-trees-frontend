import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Routes } from '../../App';
import { ContentContainer } from '../../components';
import { Typography } from 'antd';
const { Title } = Typography;

const NotFound: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Not Found</title>
        <meta
          name="Not Found"
          content="The page users are directed to after entering a route that does not exist."
        />
      </Helmet>
      <ContentContainer>
        <Title>Oops! We can't find the page you're looking for.</Title>
        <Link to={Routes.LANDING}>
          <Typography.Link>Take me back home!</Typography.Link>
        </Link>
      </ContentContainer>
    </>
  );
};

export default NotFound;
