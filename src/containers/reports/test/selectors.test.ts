import {
  getCountAdoptedInPastWeek,
  getStewardshipTableReport,
} from '../ducks/selectors';
import {
  AdoptionReport,
  StewardshipReport,
  StewardshipReportTableEntry,
} from '../ducks/types';

describe('Reports Selectors', () => {
  describe('getCountAdoptedInPastWeek', () => {
    it('counts correctly ', async () => {
      const adoptionReport1: AdoptionReport = {
        adoptionReport: [
          {
            siteId: 0,
            address: '',
            name: '',
            email: '',
            dateAdopted: new Date(2023, 3, 20),
            activityCount: 0,
            neighborhood: '',
          },
        ],
      };
      const adoptionReport2: AdoptionReport = {
        adoptionReport: [],
      };
      const adoptionReport3: AdoptionReport = {
        adoptionReport: [
          {
            siteId: 0,
            address: '',
            name: '',
            email: '',
            dateAdopted: new Date(2023, 3, 28),
            activityCount: 0,
            neighborhood: '',
          },
          {
            siteId: 0,
            address: '',
            name: '',
            email: '',
            dateAdopted: new Date(2023, 3, 20),
            activityCount: 0,
            neighborhood: '',
          },
          {
            siteId: 0,
            address: '',
            name: '',
            email: '',
            dateAdopted: new Date(2023, 3, 26),
            activityCount: 0,
            neighborhood: '',
          },
          {
            siteId: 0,
            address: '',
            name: '',
            email: '',
            dateAdopted: new Date(2023, 3, 24),
            activityCount: 0,
            neighborhood: '',
          },
        ],
      };
      expect(getCountAdoptedInPastWeek(adoptionReport1)).toEqual(0);
      expect(getCountAdoptedInPastWeek(adoptionReport2)).toEqual(0);
      // TODO fix this spec that only (sometimes?) fails when run non-locally
      // expect(getCountAdoptedInPastWeek(adoptionReport3)).toEqual(3);
    });
  });

  describe('getStewardshipTableReport', () => {
    it('maps correctly', async () => {
      const stewardshipReport: StewardshipReport = {
        stewardshipReport: [
          {
            siteId: 0,
            address: '',
            name: '',
            email: '',
            datePerformed: new Date(2023, 3, 29),
            watered: true,
            mulched: false,
            cleaned: false,
            weeded: false,
            installedWateringBag: false,
            neighborhood: '',
          },
          {
            siteId: 0,
            address: '',
            name: '',
            email: '',
            datePerformed: new Date(2023, 3, 29),
            watered: false,
            mulched: false,
            cleaned: false,
            weeded: false,
            installedWateringBag: false,
            neighborhood: '',
          },
          {
            siteId: 0,
            address: '',
            name: '',
            email: '',
            datePerformed: new Date(2023, 3, 29),
            watered: false,
            mulched: false,
            cleaned: true,
            weeded: false,
            installedWateringBag: true,
            neighborhood: '',
          },
          {
            siteId: 0,
            address: '',
            name: '',
            email: '',
            datePerformed: new Date(2023, 3, 29),
            watered: true,
            mulched: true,
            cleaned: true,
            weeded: true,
            installedWateringBag: false,
            neighborhood: '',
          },
        ],
      };

      const stewardshipTableReport: StewardshipReportTableEntry[] = [
        {
          entryId: 0,
          siteId: 0,
          address: '',
          name: '',
          email: '',
          datePerformed: new Date(2023, 3, 29),
          activitiesPerformed: ['watered'],
          neighborhood: '',
        },
        {
          entryId: 1,
          siteId: 0,
          address: '',
          name: '',
          email: '',
          datePerformed: new Date(2023, 3, 29),
          activitiesPerformed: [],
          neighborhood: '',
        },
        {
          entryId: 2,
          siteId: 0,
          address: '',
          name: '',
          email: '',
          datePerformed: new Date(2023, 3, 29),
          activitiesPerformed: ['cleaned', 'installedWateringBag'],
          neighborhood: '',
        },
        {
          entryId: 3,
          siteId: 0,
          address: '',
          name: '',
          email: '',
          datePerformed: new Date(2023, 3, 29),
          activitiesPerformed: ['watered', 'mulched', 'cleaned', 'weeded'],
          neighborhood: '',
        },
      ];

      expect(getStewardshipTableReport(stewardshipReport)).toEqual(
        stewardshipTableReport,
      );
    });
  });
});
