import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { AsyncRequestKinds } from '../../../utils/asyncRequest';
import { getMapGeoData } from './ducks/thunks';
import {
  BlockGeoDataReducerState,
  NeighborhoodGeoDataReducerState,
} from './ducks/types';
import { C4CState } from '../../../store';
import MapView from '../mapView';

interface MapContainerProps {
  readonly neighborhoods: NeighborhoodGeoDataReducerState['neighborhoodGeoData'];
  readonly blocks: BlockGeoDataReducerState['blockGeoData'];
}

const MapContainer: React.FC<MapContainerProps> = ({
  neighborhoods,
  blocks,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMapGeoData());
  }, [dispatch]);

  return (
    <>
      {blocks.kind === AsyncRequestKinds.Completed &&
        neighborhoods.kind === AsyncRequestKinds.Completed && (
          <MapView
            blocks={blocks.result}
            neighborhoods={neighborhoods.result}
          />
        )}
    </>
  );
};

const mapStateToProps = (state: C4CState): MapContainerProps => {
  return {
    neighborhoods: state.mapGeoDataState.neighborhoodGeoData,
    blocks: state.mapGeoDataState.blockGeoData,
  };
};

export default connect(mapStateToProps)(MapContainer);
