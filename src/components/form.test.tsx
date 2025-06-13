import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Form from './form';

jest.mock('../services/todoService', () => ({
  getItems: jest.fn().mockResolvedValue([
    { id: 1, title: 'Mock API Task', compleated: false },
  ]),
  postItem: jest.fn(),
  deleteItem: jest.fn(),
  updateItem: jest.fn(),
}));

jest.mock('./Card/Card', () => (props: any) => (
  <div data-testid="card">{props.item.title}</div>
));
jest.mock('./Input/Input', () => (props: any) => (
  <input
    data-testid="input"
    placeholder={props.placeholder}
    value={props.value}
    onChange={props.onChange}
    onKeyDown={props.onKeyDown}
  />
));
jest.mock('./button/Button', () => (props: any) => (
  <button data-testid={`button-${props.text}`} onClick={props.onClick}>
    {props.text}
  </button>
));

describe('Form Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders input and search fields', () => {
    render(<Form />);
    expect(screen.getAllByTestId('input').length).toBe(2); // add + search
  });

  it('adds a new todo item on Enter key', () => {
    render(<Form />);
    const input = screen.getAllByTestId('input')[0];

    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(screen.getByText('New Task')).toBeInTheDocument();
  });

  it('filters tasks based on search input', () => {
    render(<Form />);
    const input = screen.getAllByTestId('input')[0];
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    const searchInput = screen.getAllByTestId('input')[1];
    fireEvent.change(searchInput, { target: { value: 'new' } });

    expect(screen.getByText('New Task')).toBeInTheDocument();
    fireEvent.change(searchInput, { target: { value: 'xyz' } });
    expect(screen.queryByText('New Task')).not.toBeInTheDocument();
  });

  it('calls addApi and appends API tasks', async () => {
    render(<Form />);
    const button = screen.getByText('Add API');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Mock API Task')).toBeInTheDocument();
    });
  });

  it('selects and clears completed tasks', () => {
    render(<Form />);
    const input = screen.getAllByTestId('input')[0];

    fireEvent.change(input, { target: { value: 'Task 1' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    fireEvent.change(input, { target: { value: 'Task 2' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    const selectAllCheckbox = screen.getByRole('checkbox');
    fireEvent.click(selectAllCheckbox);

    const clearBtn = screen.getByTestId('button-Clear completed');
    fireEvent.click(clearBtn);

    expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
  });
});
/* 
Rendering of input fields for adding and searching todos.

Adding new tasks by typing and pressing Enter.

Filtering tasks based on search input.

Loading tasks from a mock API when "Add API" is clicked.

Selecting all tasks and clearing the completed ones.
*/