import React, { useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import MapPage from '../../components/mapComponents/mapPageComponents/mapPage';
import useWindowDimensions, {
  WindowTypes,
} from '../../components/windowDimensions';
import { getMapGeoData } from '../../components/mapComponents/ducks/thunks';
import { LANDING_BODY, LANDING_TITLE } from '../../assets/content';
import { C4CState } from '../../store';
import { isLoggedIn } from '../../auth/ducks/selectors';
import styled from 'styled-components';
import MobileMapPage from '../../components/mapComponents/mapPageComponents/mobileMapPage';
import MobileLandingBar from '../../components/mapComponents/mapPageComponents/mobileLandingBar';
import {
  MapGeoDataReducerState,
  MapViews,
} from '../../components/mapComponents/ducks/types';
import AdoptionDirections from '../../components/adoptionDirections';
import MapLegend from '../../components/mapComponents/mapLegend';
import { Routes } from '../../App';
import TreeMapDisplay from '../../components/mapComponents/mapDisplays/treeMapDisplay';

const PaddedContent = styled.div`
  padding: 24px 50px;
`;

interface LandingProps {
  readonly neighborhoods: MapGeoDataReducerState['neighborhoodGeoData'];
  readonly sites: MapGeoDataReducerState['siteGeoData'];
}

const Landing: React.FC<LandingProps> = ({ neighborhoods, sites }) => {
  const dispatch = useDispatch();
  const loggedIn: boolean = useSelector((state: C4CState) =>
    isLoggedIn(state.authenticationState.tokens),
  );

  useEffect(() => {
    dispatch(getMapGeoData());
  }, [dispatch]);

  const { windowType } = useWindowDimensions();

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
              <MobileMapPage
                mapContent={
                  <TreeMapDisplay
                    neighborhoods={neighborhoods}
                    sites={sites}
                    mobile={true}
                  />
                }
                returnTo={Routes.LANDING}
              >
                <PaddedContent>
                  <MobileLandingBar
                    barHeader={LANDING_TITLE}
                    barDescription={LANDING_BODY}
                    isLoggedIn={loggedIn}
                  >
                    <MapLegend
                      view={landingMapView}
                      mobile={true}
                      canHide={true}
                    />
                    <AdoptionDirections mobile={true} />
                  </MobileLandingBar>
                </PaddedContent>
              </MobileMapPage>
            );
          case WindowTypes.Tablet:
          case WindowTypes.NarrowDesktop:
          case WindowTypes.Desktop:
            return (
              <MapPage
                mapContent={
                  <TreeMapDisplay
                    neighborhoods={neighborhoods}
                    sites={sites}
                    mobile={false}
                  />
                }
                sidebarHeader={LANDING_TITLE}
                sidebarDescription={LANDING_BODY}
                view={landingMapView}
                windowType={windowType}
              >
                <AdoptionDirections mobile={false} />
              </MapPage>
            );
        }
      })()}
    </>
  );
};

const mapStateToProps = (state: C4CState): LandingProps => {
  return {
    neighborhoods: state.mapGeoDataState.neighborhoodGeoData,
    sites: state.mapGeoDataState.siteGeoData,
  };
};

export default connect(mapStateToProps)(Landing);
