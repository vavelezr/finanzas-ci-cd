export default function Header(){
  return (
    <header className="header">
      <div>
        <div className="h-title">Welcome back, Ashley</div>
        <div className="h-sub">Here’s an overview of all of your balances.</div>
      </div>
      <div style={{display:"flex", gap:10, alignItems:"center"}}>
        <input placeholder="Search…" style={{padding:"10px 12px", border:"1px solid #e5e7eb", borderRadius:12}}/>
        <button className="btn" style={{padding:"10px 12px"}}>🔔</button>
        <div style={{width:36, height:36, borderRadius:"50%", background:"#cbd5e1"}}/>
      </div>
    </header>
  );
}
