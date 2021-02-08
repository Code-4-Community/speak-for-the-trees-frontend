import React from 'react';
import MapSidebar from '../map-page-components/map-sidebar/MapSidebar';
import BlockTabs from '../block-tabs/BlockTabs';

const ReservationSidebar: React.FC = () => {
  return (
    <>
      <MapSidebar
        header="My Blocks"
        description="Dreamcatcher kogi taiyaki keytar. Swag typewriter craft beer cronut pok pok gentrify flannel salvia deep v pork belly pitchfork. Swag fashion axe fam. Occupy shoreditch jean shorts affogato PBR&B freegan bushwick vegan four loko pickled."
      >
        <BlockTabs />
      </MapSidebar>
    </>
  );
};

export default ReservationSidebar;