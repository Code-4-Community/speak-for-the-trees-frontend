import {
  AdoptionReport,
  StewardshipReport,
  StewardshipReportTableEntry,
} from './types';

export const getCountAdoptedInPastWeek = (
  adoptionReport: AdoptionReport | undefined,
): number | undefined => {
  return adoptionReport?.adoptionReport.filter(
    (entry) =>
      new Date(entry.dateAdopted) >
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  ).length;
};

export const getStewardshipTableReport = (
  stewardshipReport: StewardshipReport,
): StewardshipReportTableEntry[] => {
  return stewardshipReport.stewardshipReport.map((entry, idx) => {
    const activitiesPerformed = [];

    if (entry.watered) {
      activitiesPerformed.push('watered');
    }
    if (entry.mulched) {
      activitiesPerformed.push('mulched');
    }
    if (entry.cleaned) {
      activitiesPerformed.push('cleaned');
    }
    if (entry.weeded) {
      activitiesPerformed.push('weeded');
    }

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
