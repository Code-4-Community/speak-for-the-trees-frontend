import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import MapPage from '../../components/mapPageComponents/mapPage';
import MobileMapPage from '../../components/mapPageComponents/mobileMapPage';
import MobileLandingBar from '../../components/mapPageComponents/mobileLandingBar';
import LandingTreeStats from '../../components/landingTreeStats';
import useWindowDimensions, {
  WindowTypes,
} from '../../components/window-dimensions';
import { asyncRequestIsComplete } from '../../utils/asyncRequest';
import { getMapGeoData } from '../../components/mapPageComponents/ducks/thunks';
import { LANDING_BODY, LANDING_TITLE } from '../../assets/content';
import styled from 'styled-components';
import { MapGeoDataReducerState } from '../../components/mapPageComponents/ducks/types';
import { C4CState } from '../../store';

interface LandingProps {
  readonly neighborhoods: MapGeoDataReducerState['neighborhoodGeoData'];
  readonly blocks: MapGeoDataReducerState['blockGeoData'];
}

const mapStateToProps = (state: C4CState): LandingProps => {
  return {
    neighborhoods: state.mapGeoDataState.neighborhoodGeoData,
    blocks: state.mapGeoDataState.blockGeoData,
  };
};

const PaddedContent = styled.div`
  padding: 24px 50px;
`;

const Landing: React.FC<LandingProps> = ({ neighborhoods, blocks }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMapGeoData());
  }, [dispatch]);

  const { windowType } = useWindowDimensions();

  const statMoneySaved = 100000;
  const statRainWater = 100000;
  const statCarbonEmissions = 31;

  switch (windowType) {
    case WindowTypes.Mobile:
      return (
        <>
          <Helmet>
            <title>Speak for the Trees</title>
            <meta
              name="Speak for the Trees Landing"
              content="The first page someone sees if they are not logged in, contains a read only map of Boston neighborhoods and some information about the tree counts of Speak for the Trees"
            />
          </Helmet>
          {asyncRequestIsComplete(blocks) &&
            asyncRequestIsComplete(neighborhoods) && (
              <MobileMapPage
                neighborhoods={neighborhoods.result}
                blocks={blocks.result}
              >
                <PaddedContent>
                  <MobileLandingBar
                    barHeader={LANDING_TITLE}
                    barDescription={LANDING_BODY}
                  >
                    <LandingTreeStats
                      moneySaved={statMoneySaved}
                      rainWater={statRainWater}
                      carbonEmissions={statCarbonEmissions}
                    />
                  </MobileLandingBar>
                </PaddedContent>
              </MobileMapPage>
            )}
        </>
      );

    case WindowTypes.Tablet:
    case WindowTypes.NarrowDesktop:
    case WindowTypes.Desktop:
      return (
        <>
          <Helmet>
            <title>Speak for the Trees</title>
            <meta
              name="description"
              content="The first page someone sees if they are not logged in, contains a read only map of Boston neighborhoods and some information about the tree counts of Speak for the Trees"
            />
          </Helmet>
          {asyncRequestIsComplete(blocks) &&
            asyncRequestIsComplete(neighborhoods) && (
              <MapPage
                neighborhoods={neighborhoods.result}
                blocks={blocks.result}
                sidebarHeader={LANDING_TITLE}
                sidebarDescription={LANDING_BODY}
              >
                <LandingTreeStats
                  moneySaved={statMoneySaved}
                  rainWater={statRainWater}
                  carbonEmissions={statCarbonEmissions}
                />
              </MapPage>
            )}
        </>
      );
  }
};

export default connect(mapStateToProps)(Landing);
