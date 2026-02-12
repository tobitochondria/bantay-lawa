import DashboardSidebar from '../components/ui/Dashboard/DashboardSidebar'

export default function DashboardLayout({ children, navItems, userLabel, isSidebarCollapsed = false }) {
  return (
    <div className="dashboard-page">
      <DashboardSidebar navItems={navItems} userLabel={userLabel} isCollapsed={isSidebarCollapsed} />
      <main className="dashboard-main">{children}</main>
    </div>
  )
}
