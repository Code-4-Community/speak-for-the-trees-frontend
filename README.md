<img src="https://c4cneu-public.s3.us-east-2.amazonaws.com/Site/SFTT_Logo.png" width="450px"/>

# Code4Community Frontend Scaffold

This is the React.js frontend template for all Code4Community projects. 

![Build Status](https://github.com/Code-4-Community/speak-for-the-trees-frontend/workflows/build%2C+lint%2C+test/badge.svg?branch=master)

[![Coverage Status](https://coveralls.io/repos/github/Code-4-Community/speak-for-the-trees-frontend/badge.svg?branch=master)](https://coveralls.io/github/Code-4-Community/speak-for-the-trees-frontend?branch=master)

## Installation :wrench:

Use the package manager [npm](https://www.npmjs.com/) to install all the dependencies for our frontend.

```bash
npm install
```

## Available Scripts :robot:

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run check`

Runs all 4 lint, type check, and test commands below, **REQUIRED BEFORE MERGE**.

### `npm run lint-fix`

To lint and fix your files (required before merge).

### `npm run prettier-fix`

To lint and fix your files (required before merge).

### `npm run type-check`

Type checks your code (required before merge).

### `npm run test`

Runs all unit tests (required before merge). 

## Code Walkthrough :computer:
Inside the source folder, you'll find components, containers (pages), and utilities.

Each page has its own container, and each container is comprised of components.

`App.tsx` is responsible for rendering each container as its own route.

We use styled-components as our CSS-in-JS solution.

## Contributing :handshake:
Pull requests from any C4C member are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
