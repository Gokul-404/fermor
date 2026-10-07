import Trend from "./Trend";
import CountUp from "./CountUp";
const months = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];
const series = [6.2, 6.4, 6.3, 6.7, 6.9, 7.1, 7.0, 7.5, 7.8, 8.0, 8.2, 8.425];
const stats = [["Income", "₹65,000"], ["Spending", "₹32,400"], ["Investments", "₹4,82,000"]];
const goals = [["Emergency fund", 72], ["Travel", 45], ["Home", 28]] as const;
const activity = [["Salary credited", "+₹65,000"], ["Rent", "−₹18,000"], ["Monthly SIP", "−₹10,000"], ["Groceries", "−₹2,340"]];
export default function DashboardPreview({ full = false, animate = false }: { full?: boolean; animate?: boolean }) {
  return (
    <div className="rounded-card border border-line bg-white" aria-label="Sample dashboard">
      <div className="flex items-center justify-between border-b border-line px-5 py-3 text-sm">
        <span className="font-medium">Overview</span>
        <span className="text-xs text-muted">Sample data</span>
      </div>
      <div className="p-5 sm:p-6">
        {full && <p className="mb-4 text-sm text-muted">Good morning</p>}
        <p className="text-sm text-muted">Net worth</p>
        <div className="mt-1 flex items-baseline gap-3">
          <span className="text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl"><CountUp to={842500} animate={animate} /></span>
          <span className={`text-sm font-medium text-accent ${animate ? "fade-late" : ""}`}>↑ 8.4%</span>
        </div>
        <div className="mt-5"><Trend data={series} label="Net worth over 12 months, sample data" animate={animate} labels={months} /></div>
        <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-line pt-5">
          {stats.map(([k, v]) => (<div key={k}><dt className="text-xs text-muted sm:text-sm">{k}</dt><dd className="mt-1 text-sm font-semibold tabular-nums sm:text-lg">{v}</dd></div>))}
        </dl>
        {full && (
          <div className="mt-6 grid gap-6 border-t border-line pt-6 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium">Goals</h3>
              <ul className="mt-4 space-y-4">
                {goals.map(([g, p]) => (
                  <li key={g}>
                    <div className="flex justify-between text-sm"><span>{g}</span><span className="tabular-nums text-muted">{p}%</span></div>
                    <div className="mt-2 h-1.5 rounded-full bg-line" role="progressbar" aria-valuenow={p} aria-valuemin={0} aria-valuemax={100} aria-label={g}><div className="h-full rounded-full bg-accent" style={{ width: `${p}%` }} /></div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium">Recent activity</h3>
              <ul className="mt-4 divide-y divide-line text-sm">
                {activity.map(([a, b]) => (<li key={a} className="flex justify-between py-2.5"><span>{a}</span><span className="tabular-nums text-muted">{b}</span></li>))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
