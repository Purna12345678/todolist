import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './home';

// Optional: if you're using custom text in children, mock components
jest.mock('../components/logo', () => () => <div data-testid="logo" />);
jest.mock('../components/form', () => () => <div data-testid="form" />);
jest.mock('../components/footer', () => () => <div data-testid="footer" />);

describe('Home component', () => {
  it('renders Logo, Form, and Footer components', () => {
    render(<Home />);


    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('form')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
