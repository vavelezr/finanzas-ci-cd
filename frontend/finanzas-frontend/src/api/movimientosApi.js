import { httpClient } from "./httpClient";

export const movimientosApi = {
  listar: () => httpClient.get("/movimientos"),
  crear: (mov) => httpClient.post("/movimientos", mov),
  eliminar: (idx) => httpClient.del(`/movimientos/${idx}`),
  resumen: () => httpClient.get("/resumen"),
  salud: () => httpClient.get("/salud"),
};
