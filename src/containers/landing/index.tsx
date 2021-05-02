import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import MapPage from '../../components/mapPageComponents/mapPage';
import LandingTreeStats from '../../components/landingTreeStats';
import useWindowDimensions, {
  WindowTypes,
} from '../../components/windowDimensions';
import { getMapGeoData } from '../../components/mapPageComponents/ducks/thunks';
import { LANDING_BODY, LANDING_TITLE } from '../../assets/content';
import { C4CState } from '../../store';
import { UserAuthenticationReducerState } from '../../auth/ducks/types';
import { getPrivilegeLevel } from '../../auth/ducks/selectors';
import { isLoggedIn } from '../../utils/isCheck';
import styled from 'styled-components';
import MobileMapPage from '../../components/mapPageComponents/mobileMapPage';
import MobileLandingBar from '../../components/mapPageComponents/mobileLandingBar';

const PaddedContent = styled.div`
  padding: 24px 50px;
`;

interface LandingProps {
  readonly tokens: UserAuthenticationReducerState['tokens'];
}

const Landing: React.FC<LandingProps> = () => {
  const dispatch = useDispatch();
  const privilegeLevel = useSelector((state: C4CState) =>
    getPrivilegeLevel(state.authenticationState.tokens),
  );

  useEffect(() => {
    dispatch(getMapGeoData());
  }, [dispatch]);

  const { windowType } = useWindowDimensions();

  const statMoneySaved = 100000;
  const statRainWater = 100000;
  const statCarbonEmissions = 31;

  return (
    <>
      <Helmet>
        <title>Speak for the Trees</title>
        <meta
          name="description"
          content="The first page someone sees if they are not logged in, contains a read only map of Boston neighborhoods and some information about the tree counts of Speak for the Trees"
        />
      </Helmet>
      {(() => {
        switch (windowType) {
          case WindowTypes.Mobile:
            return (
              <MobileMapPage>
                <PaddedContent>
                  <MobileLandingBar
                    barHeader={LANDING_TITLE}
                    barDescription={LANDING_BODY}
                    isLoggedIn={isLoggedIn(privilegeLevel)}
                  >
                    <LandingTreeStats
                      moneySaved={statMoneySaved}
                      rainWater={statRainWater}
                      carbonEmissions={statCarbonEmissions}
                    />
                  </MobileLandingBar>
                </PaddedContent>
              </MobileMapPage>
            );
          case WindowTypes.Tablet:
          case WindowTypes.NarrowDesktop:
          case WindowTypes.Desktop:
            return (
              <MapPage
                sidebarHeader={LANDING_TITLE}
                sidebarDescription={LANDING_BODY}
              >
                <LandingTreeStats
                  moneySaved={statMoneySaved}
                  rainWater={statRainWater}
                  carbonEmissions={statCarbonEmissions}
                />
              </MapPage>
            );
        }
      })()}
    </>
  );
};

const mapStateToProps = (state: C4CState): LandingProps => {
  return {
    tokens: state.authenticationState.tokens,
  };
};

export default connect(mapStateToProps)(Landing);
