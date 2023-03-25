import React, { useEffect, useState } from 'react';
import MapPage from '../../components/mapComponents/mapPageComponents/mapPage/index';
import BlockTabs from '../../components/blockTabs/index';
import { Helmet } from 'react-helmet';
import useWindowDimensions, {
  WindowTypes,
} from '../../components/windowDimensions';
import MobileMapPage from '../../components/mapComponents/mapPageComponents/mobileMapPage';
import { useDispatch, connect } from 'react-redux';
import { getMapGeoData } from '../../components/mapComponents/ducks/thunks';
import { RESERVATION_BODY, RESERVATION_TITLE } from '../../assets/content';
import SlideDown from '../../components/slideDown';
import {
  MapGeoDataReducerState,
  MapViews,
} from '../../components/mapComponents/ducks/types';
import { C4CState } from '../../store';
import MapLegend from '../../components/mapComponents/mapLegend';
import { Routes } from '../../App';
import BlocksMapDisplay from '../../components/mapComponents/mapDisplays/blocksMapDisplay';
import { MapTypes } from '../../context/types';
import { MapTypeContext } from '../../context/mapTypeContext';

interface ReservationsProps {
  readonly blocks: MapGeoDataReducerState['blockGeoData'];
  readonly neighborhoods: MapGeoDataReducerState['neighborhoodGeoData'];
}

const Reservations: React.FC<ReservationsProps> = ({
  blocks,
  neighborhoods,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMapGeoData());
  }, [dispatch]);

  const { windowType } = useWindowDimensions();

  const reservationMapView = MapViews.BLOCKS;

  const [mapTypeId, setMapTypeId] = useState<MapTypes>(MapTypes.ROADMAP);

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
                mapContent={
                  <MapTypeContext.Provider value={mapTypeId}>
                    <BlocksMapDisplay
                      neighborhoods={neighborhoods}
                      blocks={blocks}
                      setMapTypeId={setMapTypeId}
                    />
                  </MapTypeContext.Provider>
                }
                returnTo={Routes.LANDING} // TODO: Change to my_reservations once that is complete
              >
                <SlideDown>
                  <MapLegend view={reservationMapView} />
                  <BlockTabs />
                </SlideDown>
              </MobileMapPage>
            );
          case WindowTypes.Tablet:
          case WindowTypes.NarrowDesktop:
          case WindowTypes.Desktop:
            return (
              <MapPage
                mapContent={
                  <MapTypeContext.Provider value={mapTypeId}>
                    <BlocksMapDisplay
                      neighborhoods={neighborhoods}
                      blocks={blocks}
                      setMapTypeId={setMapTypeId}
                    />
                  </MapTypeContext.Provider>
                }
                sidebarHeader={RESERVATION_TITLE}
                sidebarDescription={RESERVATION_BODY}
                view={reservationMapView}
                windowType={windowType}
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
  };
};

export default connect(mapStateToProps)(Reservations);
