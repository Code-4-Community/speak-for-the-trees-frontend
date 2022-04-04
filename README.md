# Speak for the Trees Frontend 

[![Coverage Status](https://coveralls.io/repos/github/Code-4-Community/speak-for-the-trees-frontend/badge.svg?branch=master)](https://coveralls.io/github/Code-4-Community/speak-for-the-trees-frontend?branch=master)

This is the React.js frontend for Speak for the Trees! See below for help with setup and making changes.

## Setup :wrench:

Use the package manager [npm](https://www.npmjs.com/) to install all the dependencies for our frontend.

```bash
npm install
```

After that, request a GoogleMaps API key in the SFTT Slack channel and put it in the `.env.development.local` file as `REACT_APP_GOOGLE_MAPS_KEY`. Your frontend should now be ready to go! Run `npm start` to check that everything compiles as expected.

## Available Scripts :robot:

In the project directory, you can run:

### `npm start`

Runs the app in the development mode. \
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. \
You will also see any lint errors in the console.

### `npm run check`

Runs all 4 lint, type check, and test commands below. \
This command is useful to check that your branch will pass all the CI checks and allow you to merge your PR.

### `npm run lint-fix`

To lint and fix your files. \
This is an easy fix for any lint errors you might encounter. 

### `npm run prettier-fix`

To lint and fix your files. \
This is an easy fix for any prettier errors you might encounter.

### `npm run type-check`

Type checks your code. \
Also run with `npm run check`, but useful if you only want to type-check your changes.

### `npm run test`

Runs all unit tests. \
Also run with `npm run check`, but useful if you only want to run the unit tests.

## Code Walkthrough :computer:
Inside the source folder, you'll find components, containers (pages), and utilities.

Each page has its own container, and each container is comprised of components.

`App.tsx` is responsible for rendering each container as its own route.

We use styled-components as our CSS-in-JS solution in combination with Ant.D components.

## Designs :pencil2:
All our pages and components are first designed by our amazing designers in Figma. To see the designs for the Speak for the Trees frontend please go [here](https://www.figma.com/file/vHbwUbyS0AZIuUBUNeJ6Pi/SFTT-2020-2021). You need permission to view this file, which you can request in the SFTT Slack channel.

## Contributing :handshake:
Pull requests from any C4C member are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
