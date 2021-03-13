import React from 'react';
import MapSidebar from '../mapPageComponents/mapSidebar';
import BlockTabs from '../blockTabs';
import { RESERVATION_BODY, RESERVATION_TITLE } from '../../assets/content';

const ReservationSidebar: React.FC = () => {
  return (
    <>
      <MapSidebar header={RESERVATION_TITLE} description={RESERVATION_BODY}>
        <BlockTabs />
      </MapSidebar>
    </>
  );
};

export default ReservationSidebar;
