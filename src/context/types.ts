export enum MapTypes {
  ROADMAP = 'ROADMAP',
  SATELLITE = 'SATELLITE',
}

export type SetStateType<R> = React.Dispatch<React.SetStateAction<R>>;

export type MapTypeContextType = [MapTypes, SetStateType<MapTypes>];
