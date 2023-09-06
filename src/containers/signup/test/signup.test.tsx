import { render, screen } from '@testing-library/react';
import React from 'react';
import Signup from '../index';
import { Provider } from 'react-redux';
import { generateState } from '../../../auth/test/thunks.test';
import { C4CAction, C4CState, reducers } from '../../../store';
import {
  AsyncRequestCompleted,
  AsyncRequestNotStarted,
} from '../../../utils/asyncRequest';
import { Store } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter, Route } from 'react-router-dom';
import { Routes } from '../../../App';
import {
  invalidExp,
  mockTokenResponse,
  mockUserDataResponse,
} from '../../../App.test';

// window.matchMedia is invoked when rendering the Signup page, but is not implemented in JSDOM, so we mock it here
// see more: https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
});

/*
we surround Signup with a Provider so we can mock the store (logged in or not) and BrowserRouter so we can mock the
redirect to Routes.HOME (see more: https://dev.to/iwazaru/how-to-test-react-router-redirection-with-testing-library-3i36)
 */
const mockRedirectContent = 'Redirected to home';
const MockSignupApp = (mockStore: Store<C4CState, C4CAction>) => {
  return (
    <Provider store={mockStore}>
      <BrowserRouter>
        <Signup />
        <Route path={Routes.HOME}>{mockRedirectContent}</Route>
      </BrowserRouter>
    </Provider>
  );
};

describe('Signup', () => {
  it('redirects to home when logged in', () => {
    // create a mock state where the user is logged in
    const mockAuthState: Partial<C4CState> = {
      authenticationState: {
        tokens: AsyncRequestCompleted(mockTokenResponse(invalidExp)),
        userData: AsyncRequestCompleted(mockUserDataResponse),
      },
    };
    const mockStore: Store<C4CState, C4CAction> = configureStore({
      preloadedState: generateState(mockAuthState),
      reducer: reducers,
    });

    // render the application
    render(MockSignupApp(mockStore));
    // check that redirect content was rendered
    expect(screen.queryByText(mockRedirectContent)).toBeInTheDocument();
  });

  it('renders Signup page when not logged in', () => {
    // create a mock store where the user is not logged in
    const mockAuthState: Partial<C4CState> = {
      authenticationState: {
        tokens: AsyncRequestNotStarted(),
        userData: AsyncRequestNotStarted(),
      },
    };
    const mockStore: Store<C4CState, C4CAction> = configureStore({
      preloadedState: generateState(mockAuthState),
      reducer: reducers,
    });

    // render the application
    render(MockSignupApp(mockStore));
    // check that Signup page content was rendered
    expect(screen.getAllByText('Sign Up').length).toBeGreaterThan(0);
  });
});
