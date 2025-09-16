export default function KPIGrid({ kpis = [] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 16 }}>
      {kpis.map((k) => (
        <div key={k.label} style={card}>
          <div style={{ fontSize: 12, color: "#666" }}>{k.label}</div>
          <div style={{ fontSize: 22, fontWeight: 700 }}>{k.value}</div>
        </div>
      ))}
    </div>
  );
}
const card = { padding: 14, border: "1px solid #eee", borderRadius: 12, background: "#fff", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" };
