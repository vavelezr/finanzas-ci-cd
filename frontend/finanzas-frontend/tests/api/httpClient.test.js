import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { httpClient } from '../../src/api/httpClient';
import { CONFIG } from '../../src/app/config';

let originalFetch;

describe('httpClient', () => {
  beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = vi.fn();
    CONFIG.apiBaseUrl = 'http://api.local';
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  test('GET ok devuelve JSON', async () => {
    global.fetch.mockResolvedValueOnce(new Response(
      JSON.stringify({ ok: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    ));

    const data = await httpClient.get('/salud');
    expect(global.fetch).toHaveBeenCalledWith('http://api.local/salud', expect.any(Object));
    expect(data).toEqual({ ok: true });
  });

  test('POST ok envía body y parseea respuesta', async () => {
    const body = { a: 1 };
    global.fetch.mockResolvedValueOnce(new Response(
      JSON.stringify({ id: 9 }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    ));

    const data = await httpClient.post('/x', body);

    const [, init] = global.fetch.mock.calls[0];
    expect(init.method).toBe('POST');
    expect(JSON.parse(init.body)).toEqual(body);
    expect(data).toEqual({ id: 9 });
  });

  test('DELETE 204 devuelve null', async () => {
    global.fetch.mockResolvedValueOnce(new Response(null, { status: 204 }));
    const data = await httpClient.del('/item/1');
    expect(data).toBeNull();
  });

  test('status no-OK lanza error con status', async () => {
    global.fetch.mockResolvedValueOnce(new Response('Boom', { status: 500 }));
    await expect(httpClient.get('/boom')).rejects.toThrow('[500]');
  });
});
