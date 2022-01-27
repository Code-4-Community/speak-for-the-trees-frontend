import {
  AdoptionReport,
  STEWARDSHIP_REPORT_ACTIVITY_KEYS,
  StewardshipReport,
  StewardshipReportTableEntry,
} from './types';

export const getCountAdoptedInPastWeek = (
  adoptionReport: AdoptionReport | undefined,
): number | undefined => {
  const sevenDaysAgoInMs = Date.now() - 7 * 24 * 60 * 60 * 1000;
  return adoptionReport?.adoptionReport.filter(
    (entry) => new Date(entry.dateAdopted) > new Date(sevenDaysAgoInMs),
  ).length;
};

export const getStewardshipTableReport = (
  stewardshipReport: StewardshipReport,
): StewardshipReportTableEntry[] => {
  return stewardshipReport.stewardshipReport.map((entry, idx) => {
    const activitiesPerformed: string[] = STEWARDSHIP_REPORT_ACTIVITY_KEYS.filter(
      (activity) => entry[activity],
    );

    return {
      entryId: idx,
      siteId: entry.siteId,
      address: entry.address,
      name: entry.name,
      email: entry.email,
      datePerformed: entry.datePerformed,
      activitiesPerformed,
      neighborhood: entry.neighborhood,
    };
  });
};
