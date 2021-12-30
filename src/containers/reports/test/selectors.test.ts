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
            dateAdopted: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
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
            dateAdopted: new Date(Date.now() - 24 * 60 * 60 * 1000),
            activityCount: 0,
            neighborhood: '',
          },
          {
            siteId: 0,
            address: '',
            name: '',
            email: '',
            dateAdopted: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
            activityCount: 0,
            neighborhood: '',
          },
          {
            siteId: 0,
            address: '',
            name: '',
            email: '',
            dateAdopted: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            activityCount: 0,
            neighborhood: '',
          },
          {
            siteId: 0,
            address: '',
            name: '',
            email: '',
            dateAdopted: new Date(Date.now() - 6.5 * 24 * 60 * 60 * 1000),
            activityCount: 0,
            neighborhood: '',
          },
        ],
      };
      expect(getCountAdoptedInPastWeek(adoptionReport1)).toEqual(0);
      expect(getCountAdoptedInPastWeek(adoptionReport2)).toEqual(0);
      expect(getCountAdoptedInPastWeek(adoptionReport3)).toEqual(3);
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
            datePerformed: new Date(),
            watered: true,
            mulched: false,
            cleaned: false,
            weeded: false,
            neighborhood: '',
          },
          {
            siteId: 0,
            address: '',
            name: '',
            email: '',
            datePerformed: new Date(),
            watered: false,
            mulched: false,
            cleaned: false,
            weeded: false,
            neighborhood: '',
          },
          {
            siteId: 0,
            address: '',
            name: '',
            email: '',
            datePerformed: new Date(),
            watered: false,
            mulched: false,
            cleaned: true,
            weeded: false,
            neighborhood: '',
          },
          {
            siteId: 0,
            address: '',
            name: '',
            email: '',
            datePerformed: new Date(),
            watered: true,
            mulched: true,
            cleaned: true,
            weeded: true,
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
          datePerformed: new Date(),
          activitiesPerformed: ['watered'],
          neighborhood: '',
        },
        {
          entryId: 1,
          siteId: 0,
          address: '',
          name: '',
          email: '',
          datePerformed: new Date(),
          activitiesPerformed: [],
          neighborhood: '',
        },
        {
          entryId: 2,
          siteId: 0,
          address: '',
          name: '',
          email: '',
          datePerformed: new Date(),
          activitiesPerformed: ['cleaned'],
          neighborhood: '',
        },
        {
          entryId: 3,
          siteId: 0,
          address: '',
          name: '',
          email: '',
          datePerformed: new Date(),
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
