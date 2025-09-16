import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import DonutChart from "../components/DonutChart";
import MovimientoForm from "../components/MovimientoForm";
import MovimientosTable from "../components/MovimientosTable";
import { useMovimientos } from "../hooks/useMovimientos";

export default function App(){
  const { movimientos, kpis, loading, error, crear, eliminar } = useMovimientos();

  const donutData = [
    { name: "VTI", value: 40 },
    { name: "ICLN", value: 25 },
    { name: "ICLN", value: 15 },
    { name: "BTEK", value: 20 },
  ];

  return (
    <div className="app">
      <Sidebar />
      <Header />

      {/* Content */}
      <div className="content">
        {/* Main column */}
        <div style={{display:"grid", gap:12}}>
          <div className="card">
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12}}>
              <div style={{fontWeight:800}}>Recent Transactions</div>
              <a href="#" style={{fontSize:12, color:"#0ea5e9", textDecoration:"none"}}>See all</a>
            </div>
            <MovimientoForm onSubmit={crear} disabled={loading}/>
            {error && <div style={{ marginTop: 8, color: "#b91c1c" }}>{error}</div>}
            <div style={{marginTop:16}}>
              <MovimientosTable movimientos={movimientos} onDelete={eliminar} disabled={loading}/>
            </div>
          </div>
        </div>

        {/* Right rail */}
        <div className="stack">
          <div className="kpis">
            <div className="card kpi">
              <div className="label">Total Balance</div>
              <div className="value">{kpis[2]?.value }</div>
              <div className="trend-up">+4%</div>
            </div>
            <div className="card kpi">
              <div className="label">Ingresos</div>
              <div className="value">{kpis[0]?.value}</div>
              <div className="trend-up">+2%</div>
            </div>
            <div className="card kpi">
              <div className="label">Gastos</div>
              <div className="value">{kpis[1]?.value}</div>
              <div className="trend-down">-1%</div>
            </div>
          </div>
          <DonutChart data={donutData} />
        </div>
      </div>
    </div>
  );
}
