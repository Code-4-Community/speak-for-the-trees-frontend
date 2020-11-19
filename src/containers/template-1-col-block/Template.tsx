import React from 'react';
import { Helmet } from 'react-helmet';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import { ContentContainer } from '../../components';
const { Title, Text, Paragraph } = Typography;

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
      <ContentContainer>
        {/*
          Place relevant components in here
        */}
        <Title>Hey! This is a basic single column page!</Title>

        <Paragraph>
          This is a super simple and customizable starting point for very basic
          single column layouts.
        </Paragraph>

        <Paragraph>
          Currently this is set up as a single block of some max width (set as a
          LESS variable of course) floating around in the content container. You
          can basically do whatever you want here! As you can see, the max width
          is set to <Text code>960px</Text>, so long paragraph text like this
          will wrap when it goes too far! Inner tags set to full width will also
          be bounded by this area.
        </Paragraph>

        <Paragraph>
          This is also a great place to start for one column forms (think login
          and sign up).{' '}
        </Paragraph>

        <Paragraph>
          Although, you might want to consider changing{' '}
          <Text code>@container-width</Text> to something smaller:{' '}
          <Text code>520px</Text> maybe.
        </Paragraph>

        <Paragraph>
          We also have a little bit of default padding (<Text code>24px</Text>),
          so that stretching and squeezing the page is responsive.{' '}
        </Paragraph>

        <Paragraph>
          For more complex arrangements you might want to use a grid instead,
          see the other template for that.
        </Paragraph>

        <Link to="/" component={Typography.Link}>
          Also remember that you should link like this to make use of React
          Router!
        </Link>
      </ContentContainer>
    </>
  );
};

export default Template;
