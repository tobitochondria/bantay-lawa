import DashboardStatCard from './DashboardStatCard'

export default function DashboardWelcomePanel({
  title,
  subtitle,
  dashboardLabel,
  dashboardDescription,
  stats,
  importCard,
  statColumnClass,
}) {
  return (
    <section className="card border-0 shadow-sm dashboard-overview-panel">
      <div className="card-body p-3 p-md-4">
        {title ? <h2 className="dashboard-role-title fw-bold mb-3">{title}</h2> : null}

        <div className="card border-0 shadow-sm dashboard-overview-header mb-3">
          <div className="card-body">
            <h5 className="fw-bold mb-2 d-flex align-items-center gap-2">
              <i className={`bi ${dashboardLabel?.icon ?? 'bi-house-door'}`} aria-hidden="true" />
              <span>{dashboardLabel?.text ?? 'Overview'}</span>
            </h5>
            <p className="mb-0 dashboard-muted">{dashboardDescription ?? subtitle}</p>
          </div>
        </div>

        <div className="row g-3 mb-4">
          {stats.map((stat) => (
            <DashboardStatCard
              key={stat.id}
              icon={stat.icon}
              title={stat.title}
              value={stat.value}
              columnClass={statColumnClass}
            />
          ))}
        </div>

        {importCard ? (
          <div className="card border-0 shadow-sm dashboard-import-card">
            <div className="card-body d-flex gap-3">
              <div className="dashboard-stat-icon d-inline-flex align-items-center justify-content-center rounded-3 flex-shrink-0">
                <i className={`bi ${importCard.icon ?? 'bi-upload'}`} aria-hidden="true" />
              </div>
              <div>
                <h4 className="fw-bold mb-2">{importCard.title}</h4>
                <p className="dashboard-muted mb-3">{importCard.description}</p>
                <button type="button" className="btn btn-primary rounded-pill px-4 py-1">
                  <i className="bi bi-upload me-1" aria-hidden="true" />
                  <span>Start Import</span>
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
