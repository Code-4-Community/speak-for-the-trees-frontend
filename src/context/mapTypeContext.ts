import React, { useContext } from 'react';
import { MapTypes } from './types';

export const MapTypeContext = React.createContext<MapTypes>(MapTypes.ROADMAP);

export const useMapTypeContext = (): MapTypes => useContext(MapTypeContext);

export const MapTypeContextProvider = MapTypeContext.Provider;
