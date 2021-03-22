import React, { useEffect } from 'react';
import MapPage from '../../components/mapPageComponents/mapPage/index';
import BlockTabs from '../../components/blockTabs/index';

import { Helmet } from 'react-helmet';
import { Typography } from 'antd';
import useWindowDimensions, {
  WindowTypes,
} from '../../components/window-dimensions';
import MobileMapPage from '../../components/mapPageComponents/mobileMapPage';
import { C4CState } from '../../store';
import { asyncRequestIsComplete } from '../../utils/asyncRequest';
import { connect, useDispatch } from 'react-redux';
import { getMapGeoData } from '../../components/mapPageComponents/ducks/thunks';
import { RESERVATION_BODY, RESERVATION_TITLE } from '../../assets/content';
import { MapGeoDataReducerState } from '../../components/mapPageComponents/ducks/types';
import SlideDown from '../../components/slideDown';

const { Paragraph } = Typography;

interface ReservationProps {
  readonly neighborhoods: MapGeoDataReducerState['neighborhoodGeoData'];
  readonly blocks: MapGeoDataReducerState['blockGeoData'];
}

const mapStateToProps = (state: C4CState): ReservationProps => {
  return {
    neighborhoods: state.mapGeoDataState.neighborhoodGeoData,
    blocks: state.mapGeoDataState.blockGeoData,
  };
};

const Reservations: React.FC<ReservationProps> = ({ neighborhoods, blocks }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMapGeoData());
  }, [dispatch]);

  const { windowType } = useWindowDimensions();

  switch (windowType) {
    case WindowTypes.Mobile:
      return (
        <>
          <Helmet>
            <title>Reservations</title>
            <meta
              name="Speak for the Trees Reservations"
              content="Reserve blocks"
            />
          </Helmet>
          {asyncRequestIsComplete(blocks) &&
            asyncRequestIsComplete(neighborhoods) && (
              <MobileMapPage
                blocks={blocks.result}
                neighborhoods={neighborhoods.result}
              >
                <SlideDown>
                  <BlockTabs />
                </SlideDown>
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
            <title>Reservations</title>
            <meta
              name="Speak for the Trees Reservations"
              content="Reserve blocks"
            />
          </Helmet>
          {asyncRequestIsComplete(blocks) &&
            asyncRequestIsComplete(neighborhoods) && (
              <MapPage
                blocks={blocks.result}
                neighborhoods={neighborhoods.result}
                sidebarHeader={RESERVATION_TITLE}
                sidebarDescription={RESERVATION_BODY}
              >
                <BlockTabs />
              </MapPage>
            )}
        </>
      );

    default:
      return <Paragraph>This browser type is not supported.</Paragraph>;
  }
};

export default connect(mapStateToProps)(Reservations);
