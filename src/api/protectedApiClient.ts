import App from '../App';
import AppAxiosInstance from '../auth/axios';
import {
  BlockGeoData,
  NeighborhoodGeoData,
} from '../components/mapPageComponents/mapContainer/ducks/types';

export interface ProtectedApiExtraArgs {
  readonly protectedApiClient: ProtectedApiClient;
}

export interface ProtectedApiClient {
  readonly getBlockGeoData: () => Promise<BlockGeoData>;
  readonly getNeighborhoodGeoData: () => Promise<NeighborhoodGeoData>;
  readonly changePassword: (request: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<void>;
}

enum ProtectedApiClientRoutes {
  GET_ALL_BLOCKS = 'api/v1/protected/map/blocks',
  GET_ALL_NEIGHBORHOODS = 'api/v1/protected/map/neighborhoods',
  CHANGE_PASSWORD = '/api/v1/protected/user/change_password',
}

const getBlockGeoData = (): Promise<BlockGeoData> => {
  return AppAxiosInstance.get(ProtectedApiClientRoutes.GET_ALL_BLOCKS).then(
    (response) => {
      return response.data;
    },
  );
};

const getNeighborhoodGeoData = (): Promise<NeighborhoodGeoData> => {
  return AppAxiosInstance.get(
    ProtectedApiClientRoutes.GET_ALL_NEIGHBORHOODS,
  ).then((response) => {
    return response.data;
  });
};

const changePassword = (request: {
  currentPassword: string;
  newPassword: string;
}): Promise<void> => {
  return AppAxiosInstance.post(
    ProtectedApiClientRoutes.CHANGE_PASSWORD,
    request,
  )
    .then((r) => r)
    .catch((e) => e);
};

const Client: ProtectedApiClient = Object.freeze({
  getBlockGeoData,
  getNeighborhoodGeoData,
  changePassword,
});

export default Client;
