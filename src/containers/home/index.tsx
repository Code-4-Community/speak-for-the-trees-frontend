import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { DARK_GREY, MID_GREEN } from '../../utils/colors';
import { Typography } from 'antd';
import PageHeader from '../../components/pageHeader';
import PageLayout from '../../components/pageLayout';
import LinkCarousel from '../../components/linkCarousel';
import HomeBackground from '../../assets/images/grey-logo.png';
import { HOME_HEADER, HOME_TITLE } from '../../assets/content';
import { getUserFirstName } from './ducks/selectors';
import { connect, useSelector } from 'react-redux';
import { C4CState } from '../../store';
import { UserDataReducerState } from './ducks/types';

const { Paragraph } = Typography;

const StyledSubtitle = styled(Paragraph)`
  color: ${MID_GREEN};
  font-size: 20px;
  margin-top: 50px;
  font-weight: bold;
`;

const HomeContainer = styled.div`
  max-width: 80vw;
  margin: auto;
  background: url(${HomeBackground}) no-repeat top right;
`;

type HomeProps = UserDataReducerState;

const Home: React.FC<HomeProps> = (userData) => {
  const userName = useSelector((state: C4CState) =>
    getUserFirstName(state.userDataState.userData),
  );

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta
          name="User Home"
          content="The user's home page after logging in, has links directing them to the blocks, teams, and leaderboard pages."
        />
      </Helmet>
      <PageLayout>
        <HomeContainer>
          <PageHeader
            pageTitle={`${HOME_TITLE}${userName}!`}
            pageSubtitle={HOME_HEADER}
            subtitleColor={DARK_GREY}
          />

          <StyledSubtitle>Quick Links</StyledSubtitle>
          <LinkCarousel />
        </HomeContainer>
      </PageLayout>
    </>
  );
};

const mapStateToProps = (state: C4CState): HomeProps => {
  return {
    userData: state.userDataState.userData,
  };
};

export default connect(mapStateToProps)(Home);
