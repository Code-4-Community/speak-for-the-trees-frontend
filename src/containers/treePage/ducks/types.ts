export interface SiteProps {
  siteId: number;
  blockId: number;
  lat: number;
  lng: number;
  city: string;
  zip: string;
  address: string;
  entries: SiteEntry[];
}

export interface SiteEntry {
  id: number;
  username: string;
  updatedAt: number;
  treePresent?: boolean;
  status?: string;
  genus?: string;
  species?: string;
  commonName?: string;
  confidence?: string;
  diameter?: number;
  circumference?: number;
  coverage?: string;
  pruning?: string;
  condition?: string;
  discoloring?: boolean;
  leaning?: boolean;
  constrictingGrate?: boolean;
  wounds?: boolean;
  pooling?: boolean;
  stakesWith?: boolean;
  stakesWithout?: boolean;
  light?: boolean;
  bicycle?: boolean;
  bagWith?: boolean;
  bagWithout?: boolean;
  tape?: boolean;
  suckerGrowth?: boolean;
  siteType?: string;
  sidewalkWidth?: string;
  siteWidth?: string;
  siteLength?: string;
  material?: string;
  raisedBed?: string;
  fence?: string;
  trash?: string;
  wires?: string;
  grate?: string;
  stump?: string;
  treeNotes?: string;
  siteNotes?: string;
}

export interface TreeCare {
  date: string,
  message: string,
}