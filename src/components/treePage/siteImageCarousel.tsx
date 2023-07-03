import React from 'react';
import { SiteEntryImage } from '../../containers/treePage/ducks/types';

interface SiteImageCarouselProps {
  readonly siteEntryImages: SiteEntryImage[];
}

export const SiteImageCarousel: React.FC<SiteImageCarouselProps> = () => {
  return <>I am site image carousel</>;
};
