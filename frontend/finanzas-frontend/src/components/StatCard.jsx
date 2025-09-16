export default function StatCard({title, amount, trend}){
  const positive = trend?.startsWith("+");
  return (
    <div className="card">
      <div className="stat">
        <div className="title">{title}</div>
        <div className="number">{amount}</div>
      </div>
      {trend && (
        <div className={positive ? "trend-up" : "trend-down"} style={{marginTop:6}}>
          {trend}
        </div>
      )}
    </div>
  );
}
