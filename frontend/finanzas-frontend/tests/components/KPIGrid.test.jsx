import { render, screen } from '@testing-library/react';
import KPIGrid from '../../src/components/KPIGrid';

test('muestra los kpis con sus valores', () => {
  const kpis = [
    { label: 'Ingresos', value: '100.00' },
    { label: 'Gastos', value: '60.00' },
    { label: 'Balance', value: '40.00' },
    { label: 'Movs', value: 3 },
  ];
  render(<KPIGrid kpis={kpis} />);
  expect(screen.getByText('Ingresos')).toBeInTheDocument();
  expect(screen.getByText('100.00')).toBeInTheDocument();
  expect(screen.getByText('Gastos')).toBeInTheDocument();
  expect(screen.getByText('Balance')).toBeInTheDocument();
  expect(screen.getByText('3')).toBeInTheDocument();
});
