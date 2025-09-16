import { useCallback, useEffect, useMemo, useState } from "react";
import { movimientosApi } from "../api/movimientosApi";
import { validarMovimiento } from "../domain/movimiento";
import { formatResumen } from "../domain/resumen";

// Orquesta la lógica de casos de uso (listar, crear, eliminar, obtener resumen)
export function useMovimientos() {
  const [movimientos, setMovimientos] = useState([]);
  const [resumen, setResumen] = useState(formatResumen());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cargar = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [ms, rs] = await Promise.all([movimientosApi.listar(), movimientosApi.resumen()]);
      setMovimientos(ms);
      setResumen(formatResumen(rs));
    } catch (e) {
      setError(e.message || "Error cargando datos");
    } finally {
      setLoading(false);
    }
  }, []);

  const crear = useCallback(async (draft) => {
    const { ok, value, errors } = validarMovimiento(draft);
    if (!ok) return { ok, errors };

    setLoading(true);
    setError("");
    try {
      await movimientosApi.crear(value);
      await cargar();
      return { ok: true };
    } catch (e) {
      setError(e.message || "Error creando");
      return { ok: false, errors: { general: e.message } };
    } finally {
      setLoading(false);
    }
  }, [cargar]);

  const eliminar = useCallback(async (idx) => {
    setLoading(true);
    setError("");
    try {
      await movimientosApi.eliminar(idx);
      await cargar();
    } catch (e) {
      setError(e.message || "Error eliminando");
    } finally {
      setLoading(false);
    }
  }, [cargar]);

  useEffect(() => { cargar(); }, [cargar]);

  const kpis = useMemo(() => ([
    { label: "Ingresos", value: resumen.ingresos.toFixed(2) },
    { label: "Gastos", value: resumen.gastos.toFixed(2) },
    { label: "Balance", value: resumen.balance.toFixed(2) },
    { label: "Movs", value: resumen.total_movimientos },
  ]), [resumen]);

  return { movimientos, resumen, kpis, loading, error, crear, eliminar, recargar: cargar };
}
