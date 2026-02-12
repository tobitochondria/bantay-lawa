import { router } from '@inertiajs/react'

export default function DashboardTopBar({ onToggleSidebar, isSidebarCollapsed = false }) {
  const handleGoToMap = () => {
    router.visit('/')
  }

  return (
    <div className="card border-0 shadow-sm dashboard-topbar mb-3">
      <div className="card-body d-flex align-items-center justify-content-between">
        <h4 className="mb-0 fw-bold d-flex align-items-center gap-2">
          <i className="bi bi-house-door text-primary" aria-hidden="true" />
          <span>Overview</span>
        </h4>

        <div className="d-flex align-items-center gap-2">
          <button type="button" className="btn dashboard-circle-btn rounded-circle" onClick={onToggleSidebar}>
            <i className={`bi ${isSidebarCollapsed ? 'bi-chevron-double-right' : 'bi-chevron-double-left'}`} aria-hidden="true" />
          </button>
          <button type="button" className="btn dashboard-circle-btn rounded-circle" onClick={handleGoToMap}>
            <i className="bi bi-map" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}
