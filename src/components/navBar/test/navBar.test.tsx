import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from '../index';

// window.matchMedia is invoked when rendering the NavBar page, but is not implemented in JSDOM, so we mock it here
// see more: https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

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
});
