import { test, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovimientoForm from '../../src/components/MovimientoForm';

const type = (el, value) => fireEvent.change(el, { target: { value } });

test('envía datos válidos y limpia los campos cuando ok', async () => {
  const onSubmit = vi.fn().mockResolvedValue({ ok: true });
  render(<MovimientoForm onSubmit={onSubmit} disabled={false} />);

  const selectTipo = screen.getByRole('combobox');
  const inputMonto = screen.getByRole('spinbutton');
  const [inputDescripcion, inputCategoria] = screen.getAllByPlaceholderText('Opcional');

  type(inputMonto, '123.45');
  type(inputDescripcion, 'Pago');
  type(inputCategoria, 'Trabajo');

  fireEvent.submit(screen.getByRole('button', { name: /agregar/i }).closest('form'));

  await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
  expect(onSubmit).toHaveBeenCalledWith({
    tipo: selectTipo.value,      
    monto: '123.45',             
    descripcion: 'Pago',
    categoria: 'Trabajo',
  });

  await waitFor(() => {
    expect(inputMonto.value).toBe('');
    expect(inputDescripcion).toHaveValue('');
    expect(inputCategoria).toHaveValue('');
  });
});

test('muestra errores cuando onSubmit devuelve ok:false', async () => {
  const onSubmit = vi.fn().mockResolvedValue({
    ok: false,
    errors: { monto: 'Monto > 0' },
  });
  render(<MovimientoForm onSubmit={onSubmit} />);

  fireEvent.submit(screen.getByRole('button', { name: /agregar/i }).closest('form'));

  expect(await screen.findByText(/Monto > 0/i)).toBeInTheDocument();
});

test('deshabilita inputs y botón cuando disabled=true', () => {
  render(<MovimientoForm onSubmit={vi.fn()} disabled />);

  expect(screen.getByRole('button', { name: /agregar/i })).toBeDisabled();
  expect(screen.getByRole('combobox')).toBeDisabled();
  expect(screen.getByRole('spinbutton')).toBeDisabled();

  const textboxes = screen.getAllByRole('textbox');
  expect(textboxes).toHaveLength(2);
  textboxes.forEach(tb => expect(tb).toBeDisabled());
});
