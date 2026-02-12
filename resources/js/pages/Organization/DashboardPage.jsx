import { useState } from 'react'
import DashboardTopBar from '../../components/ui/Dashboard/DashboardTopBar'
import DashboardWelcomePanel from '../../components/ui/Dashboard/DashboardWelcomePanel'
import DashboardLayout from '../../layouts/DashboardLayout'

const ORG_NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: 'bi-house-door' },
  { id: 'members', label: 'Members', icon: 'bi-people' },
  { id: 'applicants', label: 'Applicants', icon: 'bi-clipboard' },
  { id: 'add-water-quality-data', label: 'Add Water Quality Data', icon: 'bi-plus-circle' },
  { id: 'water-quality-records', label: 'Water Quality Records', icon: 'bi-file-earmark-text' },
  { id: 'bulk-dataset-import', label: 'Bulk Dataset Import', icon: 'bi-database' },
  { id: 'audit-logs', label: 'Audit Logs', icon: 'bi-activity' },
  { id: 'settings', label: 'Settings', icon: 'bi-gear' },
]

const ORG_STATS = [
  { id: 'active-members', title: 'Active Members', value: '2', icon: 'bi-people' },
  { id: 'tests-logged', title: 'Tests Logged', value: '1', icon: 'bi-database' },
  { id: 'pending', title: 'Pending Approvals', value: '0', icon: 'bi-clipboard' },
]

export default function OrganizationDashboardPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <DashboardLayout navItems={ORG_NAV_ITEMS} userLabel="Org Admin" isSidebarCollapsed={isSidebarCollapsed}>
      <DashboardTopBar
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => setIsSidebarCollapsed((currentValue) => !currentValue)}
      />
      <DashboardWelcomePanel
        title="Welcome to Laguna Water Org"
        dashboardLabel={{ text: 'Organization Dashboard', icon: 'bi-people' }}
        dashboardDescription="Overview of your organization: active members, tests logged, and pending approvals. Use the links to manage members and review tests."
        stats={ORG_STATS}
        statColumnClass="col-12 col-lg-4"
        importCard={{
          title: 'Import Data',
          icon: 'bi-upload',
          description:
            'Import water quality test data - choose between single test wizard or bulk dataset import from Excel/CSV templates.',
        }}
      />
    </DashboardLayout>
  )
}
