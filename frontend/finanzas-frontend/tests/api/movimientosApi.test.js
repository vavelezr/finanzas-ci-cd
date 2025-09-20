import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import * as http from '../../src/api/httpClient';
import { movimientosApi } from '../../src/api/movimientosApi';

describe('movimientosApi', () => {
  beforeEach(() => vi.restoreAllMocks());
  afterEach(() => vi.restoreAllMocks());

  test('listar llama GET /movimientos', async () => {
    const spy = vi.spyOn(http.httpClient, 'get').mockResolvedValueOnce([{ tipo: 'ingreso', monto: 1 }]);
    const res = await movimientosApi.listar();
    expect(spy).toHaveBeenCalledWith('/movimientos');
    expect(res).toEqual([{ tipo: 'ingreso', monto: 1 }]);
  });

  test('crear llama POST /movimientos con body', async () => {
    const body = { tipo: 'gasto', monto: 2 };
    const spy = vi.spyOn(http.httpClient, 'post').mockResolvedValueOnce({ ok: true });
    await movimientosApi.crear(body);
    expect(spy).toHaveBeenCalledWith('/movimientos', body);
  });

  test('eliminar llama DELETE con índice', async () => {
    const spy = vi.spyOn(http.httpClient, 'del').mockResolvedValueOnce(null);
    await movimientosApi.eliminar(3);
    expect(spy).toHaveBeenCalledWith('/movimientos/3');
  });

  test('resumen llama GET /resumen', async () => {
    const spy = vi.spyOn(http.httpClient, 'get').mockResolvedValueOnce({ ingresos: 10, gastos: 5 });
    const res = await movimientosApi.resumen();
    expect(spy).toHaveBeenCalledWith('/resumen');
    expect(res).toEqual({ ingresos: 10, gastos: 5 });
  });
});
