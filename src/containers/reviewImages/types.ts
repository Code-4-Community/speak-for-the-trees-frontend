import { Neighborhoods } from '../../assets/content';

export interface ReviewImageFilters {
  submittedStart: string | null;
  submittedEnd: string | null;
  neighborhoods: Neighborhoods[];
  siteIds: number[];
}

export interface FilterSiteImagesParams {
  submittedStart: string | null;
  submittedEnd: string | null;
  neighborhoods: number[] | null;
  siteIds: number[] | null;
}

export interface FilteredSiteImage {
  imageId: number;
  imageUrl: string;
  siteId: number;
  uploaderName: string;
  uploaderEmail: string;
  dateSubmitted: string;
  commonName: string;
  neighborhoodId: number;
  address: string;
}

export interface FilterSiteImagesResponse {
  filteredSiteImages: FilteredSiteImage[];
}

export interface FilterImageTableData {
  key: number;
  preview: string;
  siteId: number;
  species: string;
  neighborhood: Neighborhoods;
  dateSubmitted: string;
  submittedBy: string;
  address: string;
}
