import { Neighborhoods } from '../../assets/content';

export interface TemplateNamesResponse {
  templates: string[];
}

export interface LoadTemplateResponse {
  name: string;
  template: string;
  author: number;
}

export interface EmailerFilters {
  activityCountMin: number;
  activityCountMax: number | null;
  neighborhoods: Neighborhoods[];
  commonNames: string[];
  adoptedStart: string | null;
  adoptedEnd: string | null;
  lastActivityStart: string | null;
  lastActivityEnd: string | null;
}

export interface EmailerTableData {
  key: number;
  siteId: number;
  address: string;
  adopterName: string;
  dateAdopted: string;
  adopterEmail: string;
  adopterActivityCount: number;
  neighborhood: Neighborhoods;
  lastActivityWeeks: string;
}

export interface FilterSitesParams {
  treeCommonNames: string[] | null;
  adoptedStart: string | null;
  adoptedEnd: string | null;
  lastActivityStart: string | null;
  lastActivityEnd: string | null;
  neighborhoodIds: number[] | null;
  activityCountMin: number;
  activityCountMax: number | null;
}

export interface FilteredSite {
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

export interface FilterSitesResponse {
  filteredSites: FilteredSite[];
}
