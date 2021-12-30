import { dateSorter, renderActivities, renderSiteIdAsLink } from '../utils';
import { render, screen } from '@testing-library/react';

test('dateSorter', () => {
  const date1: Date = new Date();
  const date2: Date = new Date(date1.valueOf() - 1);
  const date3: Date = new Date(date1.valueOf() - 21);

  expect(dateSorter(date1, date2)).toEqual(1);
  expect(dateSorter(date2, date1)).toEqual(-1);
  expect(dateSorter(date3, date2)).toEqual(-20);
  expect(dateSorter(date1, date1)).toEqual(0);
});

test('renderSiteIdAsLink', () => {
  const siteId = 101;
  render(renderSiteIdAsLink(siteId));
  const linkElement = screen.getByText('101');
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveAttribute('href', '/tree/101');
});

test('renderActivities', () => {
  render(renderActivities(['watered']));
  let wateredTags = screen.getAllByText('watered');
  expect(wateredTags.length).toEqual(1);

  render(renderActivities(['watered', 'mulched']));
  render(renderActivities(['weeded', 'cleaned', 'mulched']));
  render(renderActivities(['mulched', 'weeded']));
  wateredTags = screen.getAllByText('watered');
  const cleanedTags = screen.getAllByText('cleaned');
  const mulchedTags = screen.getAllByText('mulched');
  const weededTags = screen.getAllByText('weeded');

  expect(wateredTags.length).toEqual(2);
  expect(cleanedTags.length).toEqual(1);
  expect(mulchedTags.length).toEqual(3);
  expect(weededTags.length).toEqual(2);
});
