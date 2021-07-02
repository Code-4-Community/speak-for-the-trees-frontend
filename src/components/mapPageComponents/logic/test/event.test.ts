import { getImageSize } from '../event';
import { MapViews } from '../../ducks/types';

describe('Map Events', () => {
  test('getImageSize', () => {
    expect(getImageSize(0, MapViews.TREES)).toBe(0);
    expect(getImageSize(16, MapViews.TREES)).toBe(0);
    expect(getImageSize(17, MapViews.TREES)).toBe(0);
    expect(getImageSize(18, MapViews.TREES)).toBe(1);
    expect(getImageSize(19, MapViews.TREES)).toBe(2);
    expect(getImageSize(20, MapViews.TREES)).toBe(2);
    expect(getImageSize(0, MapViews.BLOCKS)).toBe(0);
    expect(getImageSize(13, MapViews.BLOCKS)).toBe(0);
    expect(getImageSize(14, MapViews.BLOCKS)).toBe(0);
    expect(getImageSize(15, MapViews.BLOCKS)).toBe(1);
    expect(getImageSize(19, MapViews.BLOCKS)).toBe(2);
    expect(getImageSize(20, MapViews.BLOCKS)).toBe(2);
  });
});
