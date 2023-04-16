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
