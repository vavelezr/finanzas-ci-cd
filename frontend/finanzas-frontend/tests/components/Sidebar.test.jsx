import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sidebar from '../../src/components/Sidebar';

test('renderiza marca y enlaces', () => {
  render(<Sidebar />);

  expect(screen.getByText(/Finans/i)).toBeInTheDocument();
  expect(screen.getByText(/Overview/i)).toBeInTheDocument();
  expect(screen.getByText(/Budgets/i)).toBeInTheDocument();
  expect(screen.getByText(/Expenses/i)).toBeInTheDocument();
  expect(screen.getByText(/Investments/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Contact us/i })).toBeInTheDocument();
});
