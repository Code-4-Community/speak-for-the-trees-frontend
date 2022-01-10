import { render, screen } from '@testing-library/react';
import Tags from '../tags';
import React from 'react';

describe('Tags', () => {
  it('renders a single tag with the appropriate text', () => {
    const { container } = render(<Tags tagTexts={['watered']} />);
    expect(screen.queryByText('watered')).toBeInTheDocument();
    expect(container.childNodes.length).toBe(1);
  });

  it('renders multiple tags with the appropriate text', () => {
    const { container } = render(
      <Tags tagTexts={['watered', 'cleaned', 'mulched', 'weeded']} />,
    );
    expect(screen.queryByText('watered')).toBeInTheDocument();
    expect(screen.queryByText('cleaned')).toBeInTheDocument();
    expect(screen.queryByText('mulched')).toBeInTheDocument();
    expect(screen.queryByText('weeded')).toBeInTheDocument();
    expect(container.childNodes.length).toBe(4);
  });
});
