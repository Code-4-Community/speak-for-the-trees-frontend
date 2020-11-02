import React from 'react';
import { Helmet } from 'react-helmet';
import MapPage from '../../components/map-page-components/map-page/MapPage';
import LandingTreeStats from '../../components/landing-tree-stats/LandingTreeStats';

const Landing: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Landing</title>
        <meta
          name="description"
          content="The first page someone sees if they are not logged in"
        />
      </Helmet>

      <MapPage
        sidebarTitle={"Boston's Street Trees"}
        sidebarDescription={
          'Dreamcatcher kogi taiyaki keytar. Swag typewriter craft beer cronut pok pok gentrify flannel salvia deep v pork belly pitchfork. Swag fashion axe fam. Occupy biodiesel jean shorts affogato PBR&B freegan bushwick vegan four loko pickled.'
        }
      >
        <LandingTreeStats
          moneySaved={100000}
          rainWater={100000}
          carbonEmissions={31}
        />
      </MapPage>
    </>
  );
};

export default Landing;
