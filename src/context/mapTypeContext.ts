import React, { useContext } from 'react';
import { MapTypes, MapTypeContextType } from './types';

const defaultMapTypeContext: MapTypeContextType = [
  MapTypes.ROADMAP,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  (value: React.SetStateAction<MapTypes>) => {},
];

export const MapTypeContext = React.createContext<MapTypeContextType>(
  defaultMapTypeContext,
);

export const useMapTypeContext = (): MapTypeContextType =>
  useContext(MapTypeContext);
