import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  it('renders the button with given text', () => {
    const { getByText } = render(<Button text="Click Me" />);
    expect(getByText('Click Me')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button text="Click Me" onClick={handleClick} />);
    fireEvent.click(getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies the correct variant class', () => {
    const { getByText } = render(<Button text="Delete" variant="danger" />);
    const button = getByText('Delete');
    expect(button.className).toContain('btn');
    expect(button.className).toContain('danger');
  });

  it('is disabled when the disabled prop is true', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button text="Disabled" disabled onClick={handleClick} />);
    const button = getByText('Disabled') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
/* 
Rendering of button text

onClick handler execution

Correct CSS class based on variant prop

disabled behavior (click should not trigger handler)
*/