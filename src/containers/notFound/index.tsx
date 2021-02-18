import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Routes } from '../../App';
import { Typography } from 'antd';
import { ContentContainer } from '../../components';
const { Title } = Typography;

const NotFound: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Title goes here</title>
        <meta name="description" content="Description goes here." />
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
