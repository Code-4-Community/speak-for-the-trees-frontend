import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter, Router } from 'react-router-dom';
import NavBar from '../index';
import NavMenu from '../navMenu';
import { Action, Path, Location } from 'history';

// window.matchMedia is invoked when rendering the NavBar page, but is not implemented in JSDOM, so we mock it here
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

// Mock window size to test Desktop Nav Bar
Object.assign(window, { innerWidth: 1400 });

describe('NavBar', () => {
  it('shows proper content when logged out', () => {
    const mockLogout = jest.fn();

    // render the nav bar
    render(
      <BrowserRouter>
        <NavBar isAdmin={false} onLogout={mockLogout} />
      </BrowserRouter>,
    );

    expect(screen.queryByText('Log In')).toBeInTheDocument();
    expect(screen.queryByText('Sign Up')).toBeInTheDocument();
  });

  it('shows proper content when logged in, not admin', () => {
    const mockLogout = jest.fn();

    // render the nav bar
    render(
      <BrowserRouter>
        <NavBar userName={'First Last'} isAdmin={false} onLogout={mockLogout} />
      </BrowserRouter>,
    );

    expect(screen.queryByText('First Last')).toBeInTheDocument();
  });

  it('logs out on click', () => {
    const mockLogout = jest.fn();

    // render the nav menu
    render(
      <BrowserRouter>
        <NavMenu isAdmin={false} onLogout={mockLogout} />
      </BrowserRouter>,
    );

    screen.getByText('Log Out').click();

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  it('pushes destination in location state on signup and login', () => {
    const mockLogout = jest.fn();
    const state: unknown[] = [];
    const location: Location = {
      pathname: '',
      search: '',
      state: { destination: 'test' },
      hash: '',
    };
    const action: Action = 'PUSH';
    const history = {
      length: 1,
      action,
      location,
      push: (path: Path) => state.push(path),
      replace: jest.fn(),
      go: jest.fn(),
      goBack: jest.fn(),
      goForward: jest.fn(),
      block: jest.fn(),
      listen: jest.fn(),
      createHref: jest.fn(),
    };

    // render the nav bar
    render(
      <Router history={history}>
        <NavBar isAdmin={false} onLogout={mockLogout} />
      </Router>,
    );

    // click signup button, check that destination was pushed
    screen.getByText('Sign Up').click();
    expect(state[0]).toEqual({
      pathname: '/signup',
      state: { destination: '' },
    });

    // click login button, check that destination was pushed
    screen.getByText('Log In').click();
    expect(state[1]).toEqual({
      pathname: '/login',
      state: { destination: '' },
    });
  });
});
