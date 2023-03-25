import { treeCareToMoment } from '../treeFunctions';

test('TreeCare date props to moment date', () => {
  const exampleMoment1 = treeCareToMoment({
    activityId: 0,
    userId: 0,
    month: 'Oct',
    year: 2015,
    day: '15th',
    message: 'Was mulched.',
  });

  expect(exampleMoment1.get('year')).toBe(2015);
  expect(exampleMoment1.get('date')).toBe(15);
  expect(exampleMoment1.get('month')).toBe(9); // months range from 0 to 11

  const exampleMoment2 = treeCareToMoment({
    activityId: 999,
    userId: -10,
    month: 'Jan',
    year: 1999,
    day: '1st',
    message: 'Was cleaned of waste',
  });

  expect(exampleMoment2.get('year')).toBe(1999);
  expect(exampleMoment2.get('date')).toBe(1);
  expect(exampleMoment2.get('month')).toBe(0);
});
