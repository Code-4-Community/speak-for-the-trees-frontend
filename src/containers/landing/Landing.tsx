import React from 'react';
import { Helmet } from 'react-helmet';
import { Typography } from 'antd';
import MapPage from '../../components/map-page-components/map-page/MapPage';
import MobileMapPage from '../../components/map-page-components/mobile-map-page/MobileMapPage';
import MobileLandingBar from '../../components/map-page-components/mobileLandingBar';
import LandingTreeStats from '../../components/landing-tree-stats/LandingTreeStats';
import useWindowDimensions, {
  WindowTypes,
} from '../../components/window-dimensions';

const { Paragraph } = Typography;

const Landing: React.FC = () => {
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
              name="description"
              content="The first page someone sees if they are not logged in, contains a read only map of Boston neighborhoods and some information about the tree counts of Speak for the Trees"
            />
          </Helmet>
          <MobileMapPage>
            <MobileLandingBar>
              <LandingTreeStats
                moneySaved={statMoneySaved}
                rainWater={statRainWater}
                carbonEmissions={statCarbonEmissions}
              />
            </MobileLandingBar>
          </MobileMapPage>
        </>
      );
      break;

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
          <MapPage
            sidebarHeader="Boston's Street Trees"
            sidebarDescription="Dreamcatcher kogi taiyaki keytar. Swag typewriter craft beer cronut pok pok gentrify flannel salvia deep v pork belly pitchfork. Swag fashion axe fam. Occupy biodiesel jean shorts affogato PBR&B freegan bushwick vegan four loko pickled."
          >
            <LandingTreeStats
              moneySaved={statMoneySaved}
              rainWater={statRainWater}
              carbonEmissions={statCarbonEmissions}
            />
          </MapPage>
        </>
      );
      break;

    default:
      return <Paragraph>This browser type is not supported.</Paragraph>;
  }
};

export default Landing;
