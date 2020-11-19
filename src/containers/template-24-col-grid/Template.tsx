import React from 'react';
import { Helmet } from 'react-helmet';
import { Row, Col, Typography } from 'antd';
import styled from 'styled-components';
const { Title, Paragraph } = Typography;
/*
Template for future page components.

AntD Components:
https://ant.design/components/overview/
*/

const GridContentContainer = styled.div`
  padding: 24px;
`;

const ExampleCol = styled(Col)`
  border: 1px #1890ff solid;
  height: 50px;
  text-align: center;
`;

const Template: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Title goes here</title>
        <meta name="description" content="Description goes here." />
      </Helmet>

      <GridContentContainer>
        <Row>
          <Col>
            <Title>And this is a 24 column grid template!</Title>

            <Paragraph>
              Unlike the one column grid, this template can get a little messy.
              But, if you can handle a little more boilerplate, this template
              allows you to be extremely expressive and create complex designs.
              I would reccomend the grid if you are following a complex Figma
              design (it helps a lot, as both designers and developers can rely
              on the columns for accuracy). One note is that if you are trying
              to add a sidebar, dont use grid. Use Layout Siders, and consider
              moving the Content tag from App.js down to the container level.
            </Paragraph>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Title level={3}>Grid allows </Title>
            <Paragraph>
              The component tree takes a little time to get used to, but this is
              very similar to BootstrapVue or Reactstrap.
            </Paragraph>
          </Col>
          <Col span={8}>
            <Title level={3}>a lot of </Title>
            <Paragraph>
              Unlike those other frameworks, AntD chooses to use a 24 column
              layout instead of a 12 column layout. That means a span of 24 is a
              full page! This is different than most other frameworks so be
              careful here.
            </Paragraph>
          </Col>
          <Col span={6}>
            <Title level={3}>flexibility in design.</Title>
            <Paragraph>
              In general you probably want some padding to contain your grid if
              it is for layout, or maybe you just want some gutter space. This
              gets a bit complicated, but just look at the code for this page to
              see what might work best for whatever page you are creating.
            </Paragraph>
          </Col>
        </Row>
      </GridContentContainer>

      <div id="example 24 col grid">
        <Row>
          <ExampleCol span={24}>col</ExampleCol>
        </Row>
        <Row>
          <ExampleCol span={12}>col-12</ExampleCol>
          <ExampleCol span={12}>col-12</ExampleCol>
        </Row>
        <Row>
          <ExampleCol span={8}>col-8</ExampleCol>
          <ExampleCol span={8}>col-8</ExampleCol>
          <ExampleCol span={8}>col-8</ExampleCol>
        </Row>
        <Row>
          <ExampleCol span={6}>col-6</ExampleCol>
          <ExampleCol span={6}>col-6</ExampleCol>
          <ExampleCol span={6}>col-6</ExampleCol>
          <ExampleCol span={6}>col-6</ExampleCol>
        </Row>
      </div>
    </>
  );
};

export default Template;
