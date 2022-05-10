import React from 'react';
import { CONTACT_EMAIL } from '../../assets/links';

// Landing
export const LANDING_TITLE = {
  ENG: "Boston's Street Trees",
};
export const QUESTIONS_DIRECTIONS = {
  ENG: [
    <>
      Visit our{' '}
      <a
        href={'https://map.treeboston.org/faq'}
        target={'_blank'}
        rel={'noopener noreferrer'}
      >
        FAQ page
      </a>{' '}
      to see if your question is answered.
    </>,

    <>
      If not, reach out to us at{' '}
      <a
        href={`mailto:${CONTACT_EMAIL}`}
        target={'_blank'}
        rel={'noopener noreferrer'}
      >
        adopt@treeboston.org
      </a>
      .
    </>,
  ],
};
export const LANDING_BODY = {
  ENG: (
    <>
      Boston's trees do a lot for our community - they clean our polluted air,
      offer shade on scorching summer days, 'block wind on freezing winter
      nights, and prevent flooding during storms. At Speak for the Trees, '
      we're determined to improve the size, health, and equity of our urban
      forest, especially in under-served and under-canopied communities. And now
      you can help grow Boston's urban forest by adopting and caring for a tree!
      <br />
      <br />
      Learn more about the program and how to care for your tree at{' '}
      <a
        href={'https://treeboston.org/get-involved/adopt/'}
        target={'_blank'}
        rel={'noopener noreferrer'}
      >
        treeboston.org/adopt
      </a>
      .
      <br />
      <br />
      Still have questions?
    </>
  ),
};

// Welcome Modal
export const MODAL_TITLE = {
  ENG:
    'Welcome to Speak for the Trees’ Adopt-A-Tree Program, run in partnership ' +
    'with the Boston Parks and Recreation Department and Code4Community!',
};
export const MODAL_PARAGRAPH = {
  ENG:
    'Are there young, newly planted street trees near you? Explore our ' +
    'tree map to learn how to adopt one (or a few!) and care for them to ' +
    'help Boston’s young trees reach maturity and give your community ' +
    'the many benefits mature trees provide.',
};
export const MODAL_OK_TEXT = {
  ENG: "Explore Boston's urban forest!",
};

// Adoption Directions
export const ADOPTION_DIRECTIONS_HEADER = {
  ENG: 'How to Adopt a Tree',
};
export const ADOPTION_DIRECTIONS = {
  ENG: [
    'Click “Sign-Up” at the top right corner to create an account.',
    'Once you’re logged in, enter your address in the search bar on the map to find adoptable trees near you.',
    'Click on the icon of the tree you’d like to adopt, either the blue triangle for a newly planted tree ' +
      'or a green circle for an older tree.',
    'Click on “More Info”.',
    'Click on the “Adopt” button on the next screen to adopt that tree. It will be added to the “My Trees” ' +
      'list so you can easily find your tree and record your tree care activities.',
    'Record each activity by clicking on “My Trees”, finding the tree you adopted, and submitting the ' +
      'tree care activity on that tree’s page. It’s easy!',
  ],
};
