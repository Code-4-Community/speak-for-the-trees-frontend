import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { DARK_GREY, MID_GREEN } from '../../utils/colors';
import { Typography } from 'antd';
import PageHeader from '../../components/pageHeader';
import LinkCarousel from '../../components/linkCarousel';
import useWindowDimensions, {
  WindowTypes,
} from '../../components/window-dimensions';
import HomeBackground from '../../SFTTicon_GREY.png';
const { Paragraph } = Typography;

const StyledSubtitle = styled(Paragraph)`
  color: ${MID_GREEN};
  font-size: 20px;
  font-weight: bold;
`;

const HomeContainer = styled.div`
  max-width: 1400px;
  min-height: 80vh;
  margin: auto;
  padding: 24px;
  background: url(${HomeBackground}) no-repeat top right;
`;

const Home: React.FC = () => {
  const { windowType } = useWindowDimensions();
  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta
          name="User Home"
          content="The user's home page after logging in, has links directing them to the blocks, teams, and leaderboard pages."
        />
      </Helmet>
      <HomeContainer
        style={{
          marginTop: `${windowType === WindowTypes.Mobile ? '0vh' : '10vh'}`,
        }}
      >
        <PageHeader
          pageTitle="Welcome back, Jack!"
          pageSubtitle="Let's get back to those trees, why don't we?"
          subtitleColor={DARK_GREY}
        />

        <StyledSubtitle>Quick Links</StyledSubtitle>
        <LinkCarousel />
      </HomeContainer>
    </>
  );
};

export default Home;