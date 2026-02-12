const ADMIN_NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: 'bi-house-door' },
  { id: 'organizations', label: 'Organizations', icon: 'bi-gift' },
  { id: 'users', label: 'Users', icon: 'bi-people' },
  { id: 'applicants', label: 'Applicants', icon: 'bi-clipboard' },
  { id: 'water-bodies', label: 'Water Bodies', icon: 'bi-map' },
  { id: 'base-layers', label: 'Base Layers', icon: 'bi-layers' },
  { id: 'parameters', label: 'Parameters', icon: 'bi-sliders' },
  { id: 'water-quality-records', label: 'Water Quality Records', icon: 'bi-file-earmark-text' },
  { id: 'population-data', label: 'Population Data', icon: 'bi-database' },
  { id: 'system-feedback', label: 'System Feedback', icon: 'bi-chat-left-text' },
  { id: 'audit-logs', label: 'Audit Logs', icon: 'bi-activity' },
  { id: 'system-settings', label: 'System Settings', icon: 'bi-gear' },
]

export default function DashboardSidebar({ navItems = ADMIN_NAV_ITEMS, userLabel = 'System Admin', isCollapsed = false }) {
  return (
    <aside className={`dashboard-sidebar card border-0 shadow-sm ${isCollapsed ? 'dashboard-sidebar-collapsed' : ''}`}>
      <div className="dashboard-sidebar-brand d-flex align-items-center gap-2">
        <i className="bi bi-geo-alt-fill text-info" aria-hidden="true" />
        <span className="fw-semibold">LakeView PH</span>
      </div>

      <nav className="dashboard-sidebar-nav mt-3">
        {navItems.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={`dashboard-sidebar-link btn w-100 text-start d-flex align-items-center gap-2 ${index === 0 ? 'active' : ''}`}
          >
            <i className={`bi ${item.icon}`} aria-hidden="true" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="dashboard-sidebar-footer mt-auto pt-3">
        <button type="button" className="btn w-100 text-start d-flex align-items-center gap-2 dashboard-sidebar-user">
          <i className="bi bi-person" aria-hidden="true" />
          <span>{userLabel}</span>
        </button>
        <button type="button" className="btn w-100 text-start d-flex align-items-center gap-2 dashboard-sidebar-signout">
          <i className="bi bi-box-arrow-right" aria-hidden="true" />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  )
}
