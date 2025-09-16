// Validación mínima sin dependencias externas.
// Principio: Single Responsibility (validar un movimiento)
export function validarMovimiento({ tipo, monto, descripcion, categoria }) {
  const errors = {};
  if (tipo !== "ingreso" && tipo !== "gasto") errors.tipo = "Tipo inválido";
  const montoNum = Number(monto);
  if (!Number.isFinite(montoNum) || montoNum <= 0) errors.monto = "Monto > 0";
  if (descripcion != null && String(descripcion).length > 120) errors.descripcion = "Máx 120 chars";
  if (categoria != null && String(categoria).length > 60) errors.categoria = "Máx 60 chars";

  return { ok: Object.keys(errors).length === 0, value: { tipo, monto: montoNum, descripcion, categoria }, errors };
}
