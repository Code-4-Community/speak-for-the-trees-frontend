export interface AdoptionReport {
  readonly adoptionReport: AdoptionReportEntry[];
}

export interface AdoptionReportEntry {
  readonly siteId: number;
  readonly address: string;
  readonly name: string;
  readonly email: string;
  readonly dateAdopted: Date;
  readonly activityCount: number;
  readonly neighborhood: string;
}

export interface StewardshipReport {
  readonly stewardshipReport: StewardshipReportEntry[];
}

export interface StewardshipReportEntry {
  readonly siteId: number;
  readonly address: string;
  readonly name: string;
  readonly email: string;
  readonly datePerformed: Date;
  readonly watered: boolean;
  readonly mulched: boolean;
  readonly cleaned: boolean;
  readonly weeded: boolean;
  readonly neighborhood: string;
}

export interface StewardshipReportTableEntry {
  readonly entryId: number;
  readonly siteId: number;
  readonly address: string;
  readonly name: string;
  readonly email: string;
  readonly datePerformed: Date;
  readonly activitiesPerformed: string[];
  readonly neighborhood: string;
}
