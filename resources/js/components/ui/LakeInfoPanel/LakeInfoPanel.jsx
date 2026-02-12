import { useMemo, useState } from 'react'
import HeatmapTab from './HeatmapTab'
import LayersTab from './LayersTab'
import OverviewTab from './OverviewTab'
import TestsTab from './TestsTab'
import WaterQualityTab from './WaterQualityTab'
import { LAKE_MOCK_DATA } from './mockData'

const TAB_ITEMS = [
  { id: 'overview', label: 'Overview' },
  { id: 'water-quality', label: 'Water Quality' },
  { id: 'tests', label: 'Tests' },
  { id: 'heatmap', label: 'Heatmap' },
  { id: 'layers', label: 'Layers' },
]

export default function LakeInfoPanel({ isOpen, isClosing, onClose }) {
  const [activeTab, setActiveTab] = useState('overview')
  const panelClassName = `lake-info-panel ${isOpen ? 'open' : ''} ${isClosing ? 'closing' : ''}`.trim()

  const activeTabContent = useMemo(() => {
    switch (activeTab) {
      case 'water-quality':
        return <WaterQualityTab />
      case 'tests':
        return <TestsTab />
      case 'heatmap':
        return <HeatmapTab />
      case 'layers':
        return <LayersTab />
      case 'overview':
      default:
        return <OverviewTab />
    }
  }, [activeTab])

  return (
    <aside className={panelClassName} aria-hidden={!isOpen && !isClosing}>
      <div className="lake-info-header">
        <div>
          <h2 className="lake-info-title mb-0">{LAKE_MOCK_DATA.name}</h2>
          <div className="small text-white-50">Also known as {LAKE_MOCK_DATA.alternateName}</div>
        </div>

        <div className="d-flex align-items-center gap-2">
          <button type="button" className="btn btn-link p-1 text-white lake-info-icon-btn" aria-label="Close" onClick={onClose}>
            <i className="bi bi-x-lg" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="lake-info-tabs">
        {TAB_ITEMS.map((tabItem) => (
          <button
            key={tabItem.id}
            type="button"
            className={`lake-tab ${activeTab === tabItem.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tabItem.id)}
          >
            {tabItem.label}
          </button>
        ))}
      </div>

      {activeTabContent}
    </aside>
  )
}
