import React from 'react';
import { Helmet } from 'react-helmet';
import { Typography } from 'antd';
import { ContentContainer } from '../../components';

const { Title } = Typography;

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Title goes here</title>
        <meta name="description" content="Description goes here." />
      </Helmet>
      <ContentContainer>
        {/*
          Place relevant components in here
        */}
        <Title>Code4Community Frontend Scaffold</Title>
        <Title level={3}>
          Built with React.js, Typescript, and AntD components.
        </Title>
      </ContentContainer>
    </>
  );
};

export default Home;
