import React, { useEffect } from 'react';
import MapPage from '../../components/mapPageComponents/mapPage/index';
import BlockTabs from '../../components/blockTabs/index';
import { Helmet } from 'react-helmet';
import useWindowDimensions, {
  WindowTypes,
} from '../../components/windowDimensions';
import MobileMapPage from '../../components/mapPageComponents/mobileMapPage';
import { useDispatch, connect } from 'react-redux';
import { getMapGeoData } from '../../components/mapPageComponents/ducks/thunks';
import { RESERVATION_BODY, RESERVATION_TITLE } from '../../assets/content';
import SlideDown from '../../components/slideDown';
import {
  MapGeoDataReducerState,
  MapViews,
} from '../../components/mapPageComponents/ducks/types';
import { C4CState } from '../../store';
import MapLegend from '../../components/mapPageComponents/mapLegend';

interface ReservationsProps {
  readonly blocks: MapGeoDataReducerState['blockGeoData'];
  readonly neighborhoods: MapGeoDataReducerState['neighborhoodGeoData'];
  readonly sites: MapGeoDataReducerState['siteGeoData'];
}

const Reservations: React.FC<ReservationsProps> = ({
  blocks,
  neighborhoods,
  sites,
}) => {
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
              <MobileMapPage
                view={reservationMapView}
                blocks={blocks}
                neighborhoods={neighborhoods}
                sites={sites}
              >
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
                blocks={blocks}
                neighborhoods={neighborhoods}
                sites={sites}
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

const mapStateToProps = (state: C4CState): ReservationsProps => {
  return {
    neighborhoods: state.mapGeoDataState.neighborhoodGeoData,
    blocks: state.mapGeoDataState.blockGeoData,
    sites: state.mapGeoDataState.siteGeoData,
  };
};

export default connect(mapStateToProps)(Reservations);
