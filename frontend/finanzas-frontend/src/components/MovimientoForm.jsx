import { useState } from "react";

export default function MovimientoForm({ onSubmit, disabled }) {
  const [tipo, setTipo] = useState("ingreso");
  const [monto, setMonto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [errors, setErrors] = useState({});

  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await onSubmit({ tipo, monto, descripcion: descripcion || null, categoria: categoria || null });
    if (res?.ok) {
      setMonto(""); setDescripcion(""); setCategoria(""); setErrors({});
    } else setErrors(res?.errors || {});
  };

  const input = { width:"100%", padding:"10px 12px", border:"1px solid #e5e7eb", borderRadius:12 };

  return (
    <form onSubmit={handleAdd} className="form-grid">
      <div>
        <label>Tipo</label>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)} style={input} disabled={disabled}>
          <option value="ingreso">Ingreso</option>
          <option value="gasto">Gasto</option>
        </select>
        {errors.tipo && <small style={{color:"#b91c1c"}}>{errors.tipo}</small>}
      </div>
      <div>
        <label>Monto</label>
        <input type="number" step="0.01" min="0" value={monto} onChange={(e) => setMonto(e.target.value)} style={input} disabled={disabled}/>
        {errors.monto && <small style={{color:"#b91c1c"}}>{errors.monto}</small>}
      </div>
      <div>
        <label>Descripción</label>
        <input value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Opcional" style={input} disabled={disabled}/>
      </div>
      <div>
        <label>Categoría</label>
        <input value={categoria} onChange={(e) => setCategoria(e.target.value)} placeholder="Opcional" style={input} disabled={disabled}/>
      </div>
      <button type="submit" className="btn btn-primary" disabled={disabled}>Agregar</button>
    </form>
  );
}
