import { test, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovimientosTable from '../../src/components/MovimientosTable';

test('muestra filas según movimientos y permite eliminar', () => {
  const movs = [
    { tipo: 'ingreso', monto: 100, descripcion: 'Salario', categoria: 'Trabajo' },
    { tipo: 'gasto', monto: 50, descripcion: 'Transporte', categoria: 'Movilidad' },
  ];
  const onDelete = vi.fn();

  render(<MovimientosTable movimientos={movs} onDelete={onDelete} />);

  const rows = screen.getAllByRole('row');
  expect(rows).toHaveLength(3);

  const secondRow = rows[2];
  expect(within(secondRow).getByText('gasto')).toBeInTheDocument();
  expect(within(secondRow).getByText('50')).toBeInTheDocument();

  const delBtn = within(secondRow).getByRole('button', { name: /Eliminar/i });
  fireEvent.click(delBtn);
  expect(onDelete).toHaveBeenCalledWith(1);
});

test('muestra el mensaje de vacío cuando no hay movimientos', () => {
  render(<MovimientosTable movimientos={[]} onDelete={() => {}} />);

  expect(
    screen.getByText(/Sin movimientos todavía/i)
  ).toBeInTheDocument();
});
