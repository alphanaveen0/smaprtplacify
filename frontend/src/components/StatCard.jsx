export function StatCard({ label, value, icon, tone = "purple" }) {
  return (
    <article className={`kpi-card ${tone}`}>
      <span className="icon">{icon}</span>
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
        <em>Live from API</em>
      </div>
    </article>
  );
}
