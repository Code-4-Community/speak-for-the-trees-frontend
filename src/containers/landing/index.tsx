import React from 'react';
import { Helmet } from 'react-helmet';
import MapPage from '../../components/mapPageComponents/mapPage';
import MobileMapPage from '../../components/mapPageComponents/mobileMapPage';
import MobileLandingBar from '../../components/mapPageComponents/mobileLandingBar';
import LandingTreeStats from '../../components/landingTreeStats';
import useWindowDimensions, {
  WindowTypes,
} from '../../components/window-dimensions';
import { LANDING_BODY, LANDING_TITLE } from '../../assets/content';

const Landing: React.FC = () => {
  const { windowType } = useWindowDimensions();

  const statMoneySaved = 100000;
  const statRainWater = 100000;
  const statCarbonEmissions = 31;

  return (
    <>
      <Helmet>
        <title>Speak for the Trees</title>
        <meta
          name="Speak for the Trees Landing"
          content="The first page someone sees if they are not logged in, contains a read only map of Boston neighborhoods and some information about the tree counts of Speak for the Trees"
        />
      </Helmet>

      {(() => {
        switch (windowType) {
          case WindowTypes.Mobile:
            return (
              <MobileMapPage>
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

export default Landing;
