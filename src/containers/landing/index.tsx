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
import { MapProps, mapStateToProps } from '../../store';
import { LANDING_BODY, LANDING_TITLE } from '../../assets/content';

const Landing: React.FC<MapProps> = ({ neighborhoods, blocks }) => {
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
                isPadding={true}
                neighborhoods={neighborhoods.result}
                blocks={blocks.result}
              >
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
