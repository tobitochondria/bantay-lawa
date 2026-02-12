import DashboardStatCard from './DashboardStatCard'

const STATS = [
  { id: 'organizations', title: 'Organizations', value: '4', icon: 'bi-gift' },
  { id: 'users', title: 'Registered Users', value: '52', icon: 'bi-people' },
  { id: 'lakes', title: 'Lakes', value: '254', icon: 'bi-map' },
  { id: 'reports', title: 'Water Quality Reports', value: '592', icon: 'bi-droplet' },
]

export default function DashboardOverviewPanel() {
  return (
    <section className="card border-0 shadow-sm dashboard-overview-panel">
      <div className="card-body p-3 p-md-4">
        <div className="card border-0 shadow-sm dashboard-overview-header mb-3">
          <div className="card-body">
            <h5 className="fw-bold mb-2 d-flex align-items-center gap-2">
              <i className="bi bi-house-door" aria-hidden="true" />
              <span>Overview</span>
            </h5>
            <p className="mb-0 dashboard-muted">Quick operational metrics and recent platform KPIs for administrators.</p>
          </div>
        </div>

        <div className="row g-3">
          {STATS.map((stat) => (
            <DashboardStatCard key={stat.id} icon={stat.icon} title={stat.title} value={stat.value} />
          ))}
        </div>
      </div>
    </section>
  )
}
