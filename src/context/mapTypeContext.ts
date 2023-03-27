import React, { useContext } from 'react';
import { MapTypes, SetStateType } from './types';

export const MapTypeContext = React.createContext<
  [MapTypes, SetStateType<MapTypes>]
  // @ts-ignore
>([MapTypes.ROADMAP, undefined]);

export const useMapTypeContext = (): [MapTypes, SetStateType<MapTypes>] =>
  useContext(MapTypeContext);
