import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { DARK_GREY, MID_GREEN } from '../../utils/colors';
import { List, Typography } from 'antd';
import PageHeader from '../../components/pageHeader';
import PageLayout from '../../components/pageLayout';
import LinkCard, {
  Backgrounds,
  LinkCardProps,
} from '../../components/linkCard';
import LinkCarousel from '../../components/linkCarousel';
import HomeBackground from '../../assets/images/grey-logo.png';
import { HOME_HEADER, HOME_TITLE } from '../../assets/content';
import { Routes } from '../../App';
import useWindowDimensions, {
  WindowTypes,
} from '../../components/windowDimensions';
import { getUserFirstName, isAdmin } from '../../auth/ducks/selectors';
import { useSelector } from 'react-redux';
import { C4CState } from '../../store';

const { Paragraph } = Typography;

const StyledSubtitle = styled(Paragraph)`
  color: ${MID_GREEN};
  font-size: 20px;
  margin-top: 5vh;
  font-weight: bold;
`;

const HomeContainer = styled.div`
  width: 80vw;
  height: 95vh;
  margin: auto;
  padding-top: 12vh;
  background: url(${HomeBackground}) no-repeat top right;
`;

const Home: React.FC = () => {
  const { windowType } = useWindowDimensions();
  const userName = useSelector((state: C4CState) =>
    getUserFirstName(state.authenticationState.userData),
  );
  const greeting = `${HOME_TITLE}${userName}!`;

  const userIsAdmin: boolean = useSelector((state: C4CState) =>
    isAdmin(state.authenticationState.tokens),
  );

  const links: LinkCardProps[] = [
    /*
    {
      text: 'My Blocks',
      path: `${Routes.RESERVATIONS}`,
      background: Backgrounds.IMAGE_ONE,
    },
    {
      text: 'View Teams',
      path: `${Routes.AVAILABLE_TEAMS}`,
      background: Backgrounds.IMAGE_TWO,
    },
    {
      text: 'Volunteer Leaderboard',
      path: `${Routes.VOLUNTEER}`,
      background: Backgrounds.IMAGE_THREE,
    },
    {
      text: 'Team Leaderboard',
      path: `${Routes.TEAM_LEADERBOARD}`,
      background: Backgrounds.IMAGE_FOUR,
    },
    */
    {
      text: 'My Trees',
      path: `${Routes.MY_TREES}`,
      background: Backgrounds.IMAGE_ONE,
    },
    {
      text: 'Settings',
      path: `${Routes.SETTINGS}`,
      background: Backgrounds.IMAGE_TWO,
    },
  ];

  const authLinks: LinkCardProps[] = [
    {
      text: 'Reports',
      path: `${Routes.REPORTS}`,
      background: Backgrounds.IMAGE_THREE,
    },
  ];

  const allLinks: LinkCardProps[] = userIsAdmin
    ? links.concat(authLinks)
    : links;

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta
          name="description"
          content="The user's home page after logging in, has links directing them to the blocks, teams, and leaderboard pages."
        />
      </Helmet>
      <PageLayout>
        <HomeContainer>
          {(() => {
            switch (windowType) {
              case WindowTypes.Mobile:
                return (
                  <>
                    <PageHeader pageTitle={greeting} isMobile={true} />
                    <StyledSubtitle>Quick Links</StyledSubtitle>
                    <LinkCarousel data={allLinks} slidesPerPage={1} />
                  </>
                );
              case WindowTypes.Tablet:
                return (
                  <>
                    <PageHeader pageTitle={greeting} />
                    <StyledSubtitle>Quick Links</StyledSubtitle>
                    <LinkCarousel data={allLinks} slidesPerPage={2} />
                  </>
                );
              case WindowTypes.NarrowDesktop:
                return (
                  <>
                    <PageHeader
                      pageTitle={greeting}
                      pageSubtitle={HOME_HEADER}
                      subtitlecolor={DARK_GREY}
                    />
                    <StyledSubtitle>Quick Links</StyledSubtitle>
                    <List
                      dataSource={allLinks}
                      grid={{ gutter: 1, column: 3 }}
                      /*
                            pagination={{
                              pageSize: 3,
                            }}
                             */
                      renderItem={(item: LinkCardProps) => (
                        <LinkCard
                          text={item.text}
                          path={item.path}
                          background={item.background}
                        />
                      )}
                    />
                  </>
                );
              case WindowTypes.Desktop:
                return (
                  <>
                    <PageHeader
                      pageTitle={greeting}
                      pageSubtitle={HOME_HEADER}
                      subtitlecolor={DARK_GREY}
                    />
                    <StyledSubtitle>Quick Links</StyledSubtitle>
                    <List
                      dataSource={allLinks}
                      grid={{ gutter: 16, column: 4 }}
                      /* Remove comment when more links are accessible from home
                            pagination={{
                              pageSize: 4,
                            }}
                             */
                      renderItem={(item: LinkCardProps) => (
                        <LinkCard
                          text={item.text}
                          path={item.path}
                          background={item.background}
                        />
                      )}
                    />
                  </>
                );
            }
          })()}
        </HomeContainer>
      </PageLayout>
    </>
  );
};

export default Home;
