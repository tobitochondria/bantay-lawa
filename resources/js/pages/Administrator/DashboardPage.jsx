import { useState } from 'react'
import DashboardOverviewPanel from '../../components/ui/Dashboard/DashboardOverviewPanel'
import DashboardTopBar from '../../components/ui/Dashboard/DashboardTopBar'
import DashboardLayout from '../../layouts/DashboardLayout'

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

export default function AdminDashboardPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <DashboardLayout navItems={ADMIN_NAV_ITEMS} userLabel="System Admin" isSidebarCollapsed={isSidebarCollapsed}>
      <DashboardTopBar
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => setIsSidebarCollapsed((currentValue) => !currentValue)}
      />
      <DashboardOverviewPanel />
    </DashboardLayout>
  )
}
