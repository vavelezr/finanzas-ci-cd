import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StatCard from '../../src/components/StatCard';

test('muestra título y cantidad', () => {
  render(<StatCard title="Total Balance" amount="$123" />);
  expect(screen.getByText('Total Balance')).toBeInTheDocument();
  expect(screen.getByText('$123')).toBeInTheDocument();
});

test('trend positivo usa clase trend-up', () => {
  render(<StatCard title="X" amount="1" trend="+4%" />);
  const trend = screen.getByText('+4%');
  expect(trend).toHaveClass('trend-up');
});

test('trend negativo usa clase trend-down', () => {
  render(<StatCard title="X" amount="1" trend="-1%" />);
  const trend = screen.getByText('-1%');
  expect(trend).toHaveClass('trend-down');
});
