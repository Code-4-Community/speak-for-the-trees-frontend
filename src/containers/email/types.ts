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

export interface EmailerTableColumns {
  isSelected: boolean;
  siteId: number;
  address?: string;
  adopterName: string;
  dateAdopted: Date;
  activityCount: number;
  neighborhood: Neighborhoods;
  lastActivityWeeks?: number;
}

export interface FilteredSite {
  siteId: number;
  address?: string;
  adopterId: number;
  adopterName: string;
  dateAdopted: Date;
  adopterActivityCount: number;
  lastActivityWeeks?: number;
}

export interface FilterSitesResponse {
  filteredSites: FilteredSite[];
}
