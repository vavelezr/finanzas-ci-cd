export default function MovimientosTable({ movimientos = [], onDelete, disabled }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table className="table">
        <thead>
          <tr>{["#", "Tipo", "Monto", "Descripción", "Categoría", ""].map((h) => <th key={h}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {movimientos.map((m, i) => (
            <tr key={i}>
              <td>{i}</td>
              <td>{m.tipo}</td>
              <td>{m.monto}</td>
              <td>{m.descripcion ?? "—"}</td>
              <td>{m.categoria ?? "—"}</td>
              <td><button onClick={() => onDelete(i)} className="btn btn-danger" disabled={disabled}>Eliminar</button></td>
            </tr>
          ))}
          {movimientos.length === 0 && (
            <tr><td colSpan="6" style={{ padding: 12, textAlign: "center", color: "#64748b" }}>Sin movimientos todavía.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
