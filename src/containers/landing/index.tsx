import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import MapPage from '../../components/mapPageComponents/mapPage';
import LandingTreeStats from '../../components/landingTreeStats';
import useWindowDimensions, {
  WindowTypes,
} from '../../components/windowDimensions';
import { getMapGeoData } from '../../components/mapPageComponents/ducks/thunks';
import { LANDING_BODY, LANDING_TITLE } from '../../assets/content';
import { C4CState } from '../../store';
import { isLoggedIn } from '../../auth/ducks/selectors';
import styled from 'styled-components';
import MobileMapPage from '../../components/mapPageComponents/mobileMapPage';
import MobileLandingBar from '../../components/mapPageComponents/mobileLandingBar';
import { MapViews } from '../../components/mapPageComponents/ducks/types';

const PaddedContent = styled.div`
  padding: 24px 50px;
`;

const Landing: React.FC = () => {
  const dispatch = useDispatch();
  const loggedIn: boolean = useSelector((state: C4CState) =>
    isLoggedIn(state.authenticationState.tokens),
  );

  useEffect(() => {
    dispatch(getMapGeoData());
  }, [dispatch]);

  const { windowType } = useWindowDimensions();

  const statMoneySaved = 100000;
  const statRainWater = 100000;
  const statCarbonEmissions = 31;

  const landingMapView = MapViews.TREES;

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
              <MobileMapPage view={landingMapView}>
                <PaddedContent>
                  <MobileLandingBar
                    barHeader={LANDING_TITLE}
                    barDescription={LANDING_BODY}
                    isLoggedIn={loggedIn}
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
                view={landingMapView}
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

export default Landing;
