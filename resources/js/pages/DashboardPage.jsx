import DashboardOverviewPanel from '../components/ui/Dashboard/DashboardOverviewPanel'
import DashboardTopBar from '../components/ui/Dashboard/DashboardTopBar'
import DashboardLayout from '../layouts/DashboardLayout'

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardTopBar />
      <DashboardOverviewPanel />
    </DashboardLayout>
  )
}
