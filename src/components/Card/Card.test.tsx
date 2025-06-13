import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Card from './Card';

describe('Card Component', () => {
  const mockItem = { id: 1, title: 'Test Task', compleated: false };
  const toggleSelection = jest.fn();
  const removeItem = jest.fn();
  const editItem = jest.fn();

  const setup = () =>
    render(
      <Card
        item={mockItem}
        toggleSelection={toggleSelection}
        removeItem={removeItem}
        editItem={editItem}
      />
    );

  it('renders the task title', () => {
    const { getByText } = setup();
    expect(getByText('Test Task')).toBeInTheDocument();
  });

  it('calls toggleSelection on checkbox change', () => {
    const { getByRole } = setup();
    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(toggleSelection).toHaveBeenCalledWith(mockItem.id);
  });

  it('calls removeItem when remove button is clicked', () => {
    const { getByText } = setup();
    fireEvent.click(getByText('X'));
    expect(removeItem).toHaveBeenCalledWith(mockItem.id);
  });

  it('switches to input field on double click and saves edited value on blur', () => {
    const { getByText, getByDisplayValue } = setup();
    const titleSpan = getByText('Test Task');
    fireEvent.doubleClick(titleSpan);

    const input = getByDisplayValue('Test Task');
    fireEvent.change(input, { target: { value: 'Updated Task' } });
    fireEvent.blur(input);

    expect(editItem).toHaveBeenCalledWith(mockItem.id, 'Updated Task');
  });

  it('saves edited value on Enter key press', () => {
    const { getByText, getByDisplayValue } = setup();
    fireEvent.doubleClick(getByText('Test Task'));

    const input = getByDisplayValue('Test Task');
    fireEvent.change(input, { target: { value: 'New Title' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(editItem).toHaveBeenCalledWith(mockItem.id, 'New Title');
  });

  it('displays strikethrough class when completed', () => {
    const completedItem = { ...mockItem, compleated: true };
    const { container } = render(
      <Card
        item={completedItem}
        toggleSelection={toggleSelection}
        removeItem={removeItem}
        editItem={editItem}
      />
    );

    const span = container.querySelector('.listitem');
    expect(span?.classList.contains('strikethrough')).toBe(true);
  });
});
/*
Renders the title correctly

Handles checkbox toggling (toggleSelection)

Handles deletion (removeItem)

Enters edit mode on double-click

Submits changes via blur or Enter key (editItem)

Applies strikethrough class when item is completed
*/