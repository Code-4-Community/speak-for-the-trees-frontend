import React, { useEffect } from 'react';
import MapPage from '../../components/mapPageComponents/mapPage/index';
import BlockTabs from '../../components/blockTabs/index';
import { Helmet } from 'react-helmet';
import useWindowDimensions, {
  WindowTypes,
} from '../../components/windowDimensions';
import MobileMapPage from '../../components/mapPageComponents/mobileMapPage';
import { useDispatch } from 'react-redux';
import { getMapGeoData } from '../../components/mapPageComponents/ducks/thunks';
import { RESERVATION_BODY, RESERVATION_TITLE } from '../../assets/content';
import SlideDown from '../../components/slideDown';
import { MapViews } from '../../components/mapPageComponents/ducks/types';
import MapLegend from '../../components/mapPageComponents/mapLegend';

const Reservations: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMapGeoData());
  }, [dispatch]);

  const { windowType } = useWindowDimensions();

  const reservationMapView = MapViews.BLOCKS;

  return (
    <>
      <Helmet>
        <title>Reservations</title>
        <meta name="description" content="Reserve blocks" />
      </Helmet>

      {(() => {
        switch (windowType) {
          case WindowTypes.Mobile:
            return (
              <MobileMapPage view={reservationMapView}>
                <SlideDown>
                  <MapLegend view={reservationMapView} mobile={true} />
                  <BlockTabs />
                </SlideDown>
              </MobileMapPage>
            );
          case WindowTypes.Tablet:
          case WindowTypes.NarrowDesktop:
          case WindowTypes.Desktop:
            return (
              <MapPage
                sidebarHeader={RESERVATION_TITLE}
                sidebarDescription={RESERVATION_BODY}
                view={reservationMapView}
              >
                <BlockTabs />
              </MapPage>
            );
        }
      })()}
    </>
  );
};

export default Reservations;
