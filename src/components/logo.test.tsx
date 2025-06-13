import React from 'react';
import { render, screen } from '@testing-library/react';
import Logo from './logo';

describe('Logo component', () => {
  it('renders the title correctly', () => {
    render(<Logo />);
    const headingElement = screen.getByText(/title/i);
    expect(headingElement).toBeInTheDocument();
    expect(headingElement.tagName).toBe('H1');
    expect(headingElement).toHaveAttribute('id', 'title');
  });
});
