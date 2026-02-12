export default function DashboardStatCard({ icon, title, value, columnClass = 'col-12 col-md-6 col-xl-3' }) {
  return (
    <div className={columnClass}>
      <div className="card border-0 shadow-sm dashboard-stat-card h-100">
        <div className="card-body d-flex align-items-center gap-3">
          <div className="dashboard-stat-icon d-inline-flex align-items-center justify-content-center rounded-3">
            <i className={`bi ${icon}`} aria-hidden="true" />
          </div>
          <div>
            <div className="dashboard-muted fw-semibold">{title}</div>
            <div className="dashboard-stat-value fw-bold">{value}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
