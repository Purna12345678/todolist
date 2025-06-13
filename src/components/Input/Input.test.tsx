import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input Component', () => {
  it('renders with correct value and placeholder', () => {
    const { getByPlaceholderText } = render(
      <Input value="test" onChange={() => {}} placeholder="Enter something" />
    );
    const input = getByPlaceholderText('Enter something') as HTMLInputElement;

    expect(input).toBeInTheDocument();
    expect(input.value).toBe('test');
  });

  it('calls onChange handler when value changes', () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText } = render(
      <Input value="" onChange={handleChange} placeholder="Type here" />
    );
    const input = getByPlaceholderText('Type here');

    fireEvent.change(input, { target: { value: 'hello' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('calls onKeyDown handler when a key is pressed', () => {
    const handleKeyDown = jest.fn();
    const { getByPlaceholderText } = render(
      <Input value="" onChange={() => {}} onKeyDown={handleKeyDown} placeholder="Type here" />
    );
    const input = getByPlaceholderText('Type here');

    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(handleKeyDown).toHaveBeenCalledTimes(1);
  });
});
//Proper rendering of value and placeholder.

//onChange is triggered when typing.

//onKeyDown is triggered when pressing a key.
