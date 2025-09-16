export function formatResumen(raw) {
  if (!raw) return { ingresos: 0, gastos: 0, balance: 0, total_movimientos: 0, gastos_por_categoria: {} };
  return {
    ingresos: Number(raw.ingresos || 0),
    gastos: Number(raw.gastos || 0),
    balance: Number(raw.balance || 0),
    total_movimientos: Number(raw.total_movimientos || 0),
    gastos_por_categoria: raw.gastos_por_categoria || {},
  };
}
