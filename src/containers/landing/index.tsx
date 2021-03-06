import React, { useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import MapPage from '../../components/mapPageComponents/mapPage';
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
import {
  MapGeoDataReducerState,
  MapViews,
} from '../../components/mapPageComponents/ducks/types';
import AdoptionDirections from '../../components/adoptionDirections';
import MapLegend from '../../components/mapPageComponents/mapLegend';

const PaddedContent = styled.div`
  padding: 24px 50px;
`;

interface LandingProps {
  readonly blocks: MapGeoDataReducerState['blockGeoData'];
  readonly neighborhoods: MapGeoDataReducerState['neighborhoodGeoData'];
  readonly sites: MapGeoDataReducerState['siteGeoData'];
}

const Landing: React.FC<LandingProps> = ({ blocks, neighborhoods, sites }) => {
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
                blocks={blocks}
                neighborhoods={neighborhoods}
                sites={sites}
                view={landingMapView}
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
                sidebarHeader={LANDING_TITLE}
                sidebarDescription={LANDING_BODY}
                blocks={blocks}
                neighborhoods={neighborhoods}
                sites={sites}
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
    blocks: state.mapGeoDataState.blockGeoData,
    sites: state.mapGeoDataState.siteGeoData,
  };
};

export default connect(mapStateToProps)(Landing);
