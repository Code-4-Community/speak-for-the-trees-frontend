import { act, fireEvent, render, screen } from '@testing-library/react';
import CopyText, { copyToClipboard } from '../index';
import React from 'react';

/*
since Jest tests run in JSDOM environment, we have to define the navigator properties to use navigator.clipboard.writeText
(see more at https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom)
 */
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

describe('copyText tests', () => {
  describe('copyToClipboard test', () => {
    it('writes to clipboard', async () => {
      await copyToClipboard('test copy to clipboard');
      expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        'test copy to clipboard',
      );
    });
  });

  describe('onClick tests', () => {
    it('displays success feedback on copy', async () => {
      const mockCopySuccess = jest.fn().mockImplementation(() => {
        return Promise.resolve();
      });

      render(<CopyText text={'test'} onCopy={mockCopySuccess} />);
      fireEvent.click(screen.getByText('test'));
      expect(mockCopySuccess).toHaveBeenCalledTimes(1);
      expect(screen.queryByText('Copied to clipboard!')).toBeInTheDocument();
    });

    it('displays error on copy fail', async () => {
      const mockCopyFail = jest.fn().mockImplementation(() => {
        return Promise.reject();
      });

      render(<CopyText text={'fail'} onCopy={mockCopyFail} />);

      await act(async () => {
        fireEvent.click(screen.getByText('fail'));
      });
      expect(mockCopyFail).toHaveBeenCalledTimes(1);
      expect(
        screen.queryByText('Browser does not support copying to clipboard.'),
      ).toBeInTheDocument();
    });
  });
});
