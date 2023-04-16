import { Neighborhoods } from '../../assets/content';

export enum EmailType {
  INACTIVE = 'Inactive',
  NEIGHBORHOOD = 'Neighborhood',
}

export interface EmailerFilters {
  activityCountMin: number;
  activityCountMax?: number;
  neighborhoods: string[];
  commonNames: string[];
  adoptedStart?: string;
  adoptedEnd?: string;
  lastActivityStart?: string;
  lastActivityEnd?: string;
}

export interface FilterSitesRequest {
  treeSpecies?: string[];
  adoptedStart?: string;
  adoptedEnd?: string;
  lastActivityStart?: string;
  lastActivityEnd?: string;
  neighborhoodIds?: number[];
}

export interface FilterSitesData {
  siteId: number;
  address?: string;
  adopterId: number;
  adopterName: string;
  adopterEmail: string;
  dateAdopted: string;
  adopterActivityCount: number;
  neighborhoodId: number;
  lastActivityWeeks?: number;
}

export interface EmailerTableData {
  key: string;
  siteId: number;
  address: string;
  adopterName: string;
  adopterEmail: string;
  dateAdopted: string;
  adopterActivityCount: number;
  neighborhood: Neighborhoods;
  lastActivityWeeks: string;
}
