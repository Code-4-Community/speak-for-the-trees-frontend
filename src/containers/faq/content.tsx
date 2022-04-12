import React from 'react';

// FAQ Questions
export const QUESTION_ONE = {
  ENG: 'How do you adopt a tree?',
};
export const QUESTION_TWO = {
  ENG: 'How do you record tree care activities?',
};
export const QUESTION_THREE = {
  ENG: 'How do you "unadopt" a tree?',
};
export const QUESTION_FOUR = {
  ENG: "Where can I find a list of the trees I've adopted?",
};
export const QUESTION_FIVE = {
  ENG: 'Can I adopt multiple trees?',
};
export const QUESTION_SIX = {
  ENG:
    'What should I do if my tree is severely damaged or it looks like there is insect/fungi damage?',
};
export const QUESTION_SEVEN = {
  ENG: 'What should I do if my tree is no longer there?',
};
export const QUESTION_EIGHT = {
  ENG: 'Should I put plants in the tree pit with the tree?',
};

// FAQ Answers
export const ANSWER_ONE = {
  ENG: [
    'Click “Sign-Up” at the top right corner to create an account.',
    'Once you’re logged in, enter your address in the search bar on the map to find adoptable trees near you.',
    'Click on the icon of the tree you’d like to adopt, either the blue triangle for a newly planted tree or a green ' +
      'circle for an older tree.',
    'Click on “More Info”.',
    'Click on the “Adopt” button on the next screen to adopt that tree. It will be added to the “My Trees” list so ' +
      'you can easily find your tree and record your tree care activities.',
    'Record each activity by clicking on “My Trees”, finding the tree you adopted, and submitting the tree care ' +
      'activity on that tree’s page. It’s easy, and it helps us track the success of the Adopt-A-Tree program!',
  ],
};
export const ANSWER_TWO = {
  ENG: [
    <>
      Go to{' '}
      <a
        href={'https://map.treeboston.org/home'}
        target={'_blank'}
        rel={'noopener noreferrer'}
      >
        map.treeboston.org/home
      </a>{' '}
      and click on “My Trees”.
    </>,
    <>
      On the right-hand side of your screen, click “More Info” under the tree
      you cared for.
    </>,
    <>
      You should see this on your screen where you can enter what you did and
      when:
      <br />
      <img
        src={'https://d2j3fegnzkmagm.cloudfront.net/stewardship-form.png'}
        alt={'stewardship form'}
      />
    </>,
  ],
};
export const ANSWER_THREE = {
  ENG:
    'On your tree’s page, click on the “unadopt” button that is in place of the original adopt button. Please make ' +
    'sure to “unadopt” trees you are no longer able to care for so others have the opportunity to adopt them and ' +
    'the trees can get the care they need.',
};
export const ANSWER_FOUR = {
  ENG: (
    <>
      Go to{' '}
      <a
        href={'https://map.treeboston.org/my-trees'}
        target={'_blank'}
        rel={'noopener noreferrer'}
      >
        map.treeboston.org/my-trees
      </a>
      .
    </>
  ),
};
export const ANSWER_FIVE = {
  ENG:
    'Yes! We encourage you to adopt as many trees as you’d like. We do ask that you “unadopt” trees you are no ' +
    'longer able to care for so others can adopt and care for those trees.',
};
export const ANSWER_SIX = {
  ENG:
    'You will need to submit a 311 request to the city. If it is a hazard, you should use the word "hazard" in your ' +
    '311 request and try to describe it specifically - a broken limb in the canopy that is dangling overhead, for ' +
    'instance, or an increased lean of the main trunk and visible signs of fungal disease. This information will ' +
    'help the City Arborists triage requests that relate to public safety.',
};
export const ANSWER_SEVEN = {
  ENG: (
    <>
      If your tree has been removed, or there is an empty pit near you and you’d
      like a tree there, you should submit a{' '}
      <a
        href={'https://www.cityofboston.gov/311/'}
        target={'_blank'}
        rel={'noopener noreferrer'}
      >
        311 request
      </a>{' '}
      to the city.
    </>
  ),
};
export const ANSWER_EIGHT = {
  ENG:
    'Please do not plant anything within the tree pits. You may mulch the tree if you’d like and weed the pit.',
};
