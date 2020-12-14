import React from 'react';
import { Helmet } from 'react-helmet';
import './home.less';
import styled from 'styled-components';
import { DARKGREY, MID_GREEN } from '../../colors';
import PageHeader from '../../components/pageheader/PageHeader';
import LinkCard from '../../components/linkcard/LinkCard';
import { Col, Row, Typography } from 'antd';
const { Paragraph } = Typography;

const cSpan = 6;

const StyledSubtitle = styled(Paragraph)`
  color: ${MID_GREEN};
  font-size: 20px;
  font-weight: bold;
  margin-top: 56px;
`;

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta
          name="description"
          content="The user's home page after logging in, has links directing them to the blocks, teams, and leaderboard pages."
        />
      </Helmet>
      <div className="homeContainer">
        <PageHeader
          pageTitle="Welcome back, Jack!"
          pageSubtitle="Let's get back to those trees, why don't we?"
          subtitleColor={DARKGREY}
        />

        <StyledSubtitle>Quick Links</StyledSubtitle>
        <div>
          <Row>
            <Col span={cSpan}>
              <LinkCard text="My Blocks" path="/" background="img1" />
            </Col>
            <Col span={cSpan}>
              <LinkCard text="View Teams" path="/" background="img2" />
            </Col>
            <Col span={cSpan}>
              <LinkCard
                text="Volunteer Leaderboard"
                path="/"
                background="img3"
              />
            </Col>
            <Col span={cSpan}>
              <LinkCard text="Team Leaderboard" path="/" background="img4" />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Home;
