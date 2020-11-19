import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';
const { Title } = Typography;

/*
Template for future page components.

AntD Components:
https://ant.design/components/overview/
*/

const Template: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Title goes here</title>
        <meta name="description" content="Description goes here." />
      </Helmet>
      <div className="content-container">
        {/*
          Place relevant components in here
        */}
        <Title>Oops! We can't find the page you're looking for.</Title>

        <Link to="/">
          <Typography.Link>Take me back home!</Typography.Link>
        </Link>
      </div>
    </>
  );
};

export default Template;
