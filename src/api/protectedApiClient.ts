import App from '../App';
import AppAxiosInstance from '../auth/axios';
import { 
  blockResponseToFrontend, 
  BlockGeoData, 
  neighborhoodResponseToFrontend,
  NeighborhoodGeoData,
} from '../containers/reservations/ducks/types';

export interface ProtectedApiExtraArgs {
  readonly protectedApiClient: ProtectedApiClient;
}

export interface ProtectedApiClient {
  readonly getBlockGeoData: () => Promise<BlockGeoData>;
  readonly getNeighborhoodGeoData: () => Promise<NeighborhoodGeoData>;
}

enum ProtectedApiClientRoutes {
  GET_ALL_BLOCKS = 'api/v1/protected/map/blocks',
  GET_ALL_NEIGHBORHOODS = 'api/v1/protected/map/neighborhoods',
}

const getBlockGeoData = (): Promise<BlockGeoData> => {
  return AppAxiosInstance.get(ProtectedApiClientRoutes.GET_ALL_BLOCKS)
  .then((response) => {
    return blockResponseToFrontend(response.data)
  })
}

const getNeighborhoodGeoData = (): Promise<NeighborhoodGeoData> => {
  return AppAxiosInstance.get(ProtectedApiClientRoutes.GET_ALL_NEIGHBORHOODS)
  .then((response) => {
    return neighborhoodResponseToFrontend(response.data)
  })
}

const Client: ProtectedApiClient = Object.freeze({
  getBlockGeoData,
  getNeighborhoodGeoData,
});

export default Client;