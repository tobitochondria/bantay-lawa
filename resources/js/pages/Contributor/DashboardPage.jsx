import { useState } from 'react'
import DashboardTopBar from '../../components/ui/Dashboard/DashboardTopBar'
import DashboardWelcomePanel from '../../components/ui/Dashboard/DashboardWelcomePanel'
import DashboardLayout from '../../layouts/DashboardLayout'

const CONTRIBUTOR_NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: 'bi-house-door' },
  { id: 'add-water-quality-data', label: 'Add Water Quality Data', icon: 'bi-plus-circle' },
  { id: 'water-quality-records', label: 'Water Quality Records', icon: 'bi-file-earmark-text' },
  { id: 'bulk-dataset-import', label: 'Bulk Dataset Import', icon: 'bi-database' },
  { id: 'settings', label: 'Settings', icon: 'bi-gear' },
]

const CONTRIBUTOR_STATS = [
  { id: 'my-drafts', title: 'My Draft Tests', value: '0', icon: 'bi-clipboard' },
  { id: 'my-published', title: 'My Published Tests', value: '0', icon: 'bi-database' },
  { id: 'org-published', title: 'Org Published Tests', value: '1', icon: 'bi-people' },
]

export default function ContributorDashboardPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <DashboardLayout navItems={CONTRIBUTOR_NAV_ITEMS} userLabel="Contributor" isSidebarCollapsed={isSidebarCollapsed}>
      <DashboardTopBar
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => setIsSidebarCollapsed((currentValue) => !currentValue)}
      />
      <DashboardWelcomePanel
        title="Welcome to Laguna Water Org"
        dashboardLabel={{ text: 'Contributor Dashboard', icon: 'bi-house-door' }}
        dashboardDescription="Quick summary of your tests and organization-level published tests. Use the links to view or manage your water quality tests."
        stats={CONTRIBUTOR_STATS}
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
