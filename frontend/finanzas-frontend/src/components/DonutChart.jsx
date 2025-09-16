import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#10b981","#0ea5e9","#a78bfa","#f59e0b","#ef4444","#14b8a6"];

export default function DonutChart({ data }){
  if (!data?.length) return <div style={{color:"#64748b"}}>No data</div>;
  return (
    <div className="card">
      <div style={{fontWeight:700, marginBottom:8}}>Investments</div>
      <div style={{height:200}}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" innerRadius={55} outerRadius={80} paddingAngle={4}>
              {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div style={{display:"flex", gap:10, flexWrap:"wrap"}}>
        {data.map((d,i)=>(
          <div key={i} className="badge" style={{display:"inline-flex", gap:6, alignItems:"center"}}>
            <span style={{width:10,height:10,borderRadius:999,background:COLORS[i%COLORS.length]}}/>
            {d.name}
          </div>
        ))}
      </div>
    </div>
  );
}
