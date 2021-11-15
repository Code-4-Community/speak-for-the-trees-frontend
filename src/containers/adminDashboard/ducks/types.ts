export interface AddSitesRequest {
  sites: AddSitesRow[];
}

export interface csvRow {
  "Latitude": string;
  "Longitude": string;
  "City": string;
  "Zip": string;
  "Address": string;
  "Neighborhood Id": string;
  "Tree Present": string;
  "Status": string;
  "Genus": string;
  "Species": string;
  "Common Name": string;
  "Confidence": string;
  "Diameter": string;
  "Circumference": string;
  "Multistem": string;
  "Coverage": string;
  "Pruning": string;
  "Condition": string;
  "Discoloring": string;
  "Leaning": string;
  "Constricting Grate": string;
  "Wounds": string;
  "Pooling": string;
  "Stakes With Wires": string;
  "Stakes Without Wires": string;
  "Light": string;
  "Bicycle": string;
  "Bag Empty": string;
  "Bag Filled": string;
  "Tape": string;
  "Sucker Growth": string;
  "Site Type": string;
  "Sidewalk Width": string;
  "Site Width": string;
  "Site Length": string;
  "Material": string;
  "Raised Bed": string;
  "Fence": string;
  "Trash": string;
  "Wires": string;
  "Grate": string;
  "Stump": string;
  "Tree Notes": string;
  "Site Notes": string;
  "Block Id": string; 
}

export interface RequiredAddSitesRows {
  lat: number;
  lng: number;
  city: string;
  zip: string;
  address: string;
  neighborhoodId: number;
}

export interface AddSitesRow extends RequiredAddSitesRows{
  blockId?: number;
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
  discoloring: boolean;
  leaning: boolean;
  constrictingGrate: boolean;
  wounds: boolean;
  pooling: boolean;
  stakesWith: boolean;
  stakesWithout: boolean;
  light: boolean;
  bicycle: boolean;
  bagWith: boolean;
  bagWithout: boolean;
  tape: boolean;
  suckerGrowth: boolean;
  siteType?: string;
  sidewalkWidth?: string;
  siteWidth?: number;
  siteLength?: number;
  material?: string;
  raisedBed: boolean;
  fence: boolean;
  trash: boolean;
  wires: boolean;
  grate: boolean;
  stump: boolean;
  treeNotes?: string;
  siteNotes?: string;
}