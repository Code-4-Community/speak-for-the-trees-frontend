import React from 'react';
import MapPage from '../../components/map-page-components/map-page/MapPage';
import BlockTabs from '../../components/block-tabs/BlockTabs';

const Reservations: React.FC = () => {
  return (
    <MapPage
      sidebarHeader="My Blocks"
      sidebarDescription="Dreamcatcher kogi taiyaki keytar. Swag typewriter craft beer cronut pok pok gentrify flannel salvia deep v pork belly pitchfork. Swag fashion axe fam. Occupy shoreditch jean shorts affogato PBR&B freegan bushwick vegan four loko pickled."
    >
      <BlockTabs />
    </MapPage>
  );
};

export default Reservations;
