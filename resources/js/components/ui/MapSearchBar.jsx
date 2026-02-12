import { useState } from 'react'
import MapFilterPanel from './MapFilterPanel'
import MapSearchPanel from './MapSearchPanel'

export default function MapSearchBar({ onMenuClick }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isSearchPanelOpen, setIsSearchPanelOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchPanelOpen = () => {
    setIsSearchPanelOpen(true)
    setIsFilterOpen(false)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    setIsSearchPanelOpen(true)
    setIsFilterOpen(false)
  }

  const toggleFilters = () => {
    setIsFilterOpen((currentValue) => {
      const nextValue = !currentValue

      if (nextValue) {
        setIsSearchPanelOpen(false)
      }

      return nextValue
    })
  }

  return (
    <div className="map-search card shadow-sm border-0">
      <div className="input-group">
        <button
          className="btn btn-light map-search-icon text-success"
          type="button"
          aria-label="Menu"
          onClick={onMenuClick}
        >
          <i className="bi bi-list fs-5" aria-hidden="true" />
        </button>
        <input
          type="text"
          className="form-control border-0"
          value={searchTerm}
          placeholder="Search LakeView"
          aria-label="Search LakeView"
          onClick={handleSearchPanelOpen}
          onFocus={handleSearchPanelOpen}
          onChange={handleSearchChange}
        />
        <button
          className="btn btn-light map-search-icon text-success"
          type="button"
          aria-label="Search"
          onClick={handleSearchPanelOpen}
        >
          <i className="bi bi-search fs-6" aria-hidden="true" />
        </button>
        <button
          className="btn btn-light map-search-icon text-success"
          type="button"
          aria-label="Filter"
          aria-expanded={isFilterOpen}
          onClick={toggleFilters}
        >
          <i className="bi bi-funnel fs-6" aria-hidden="true" />
        </button>
      </div>

      <div className={`map-search-panel-wrapper ${isSearchPanelOpen ? 'map-search-panel-open' : ''}`}>
        <MapSearchPanel searchTerm={searchTerm} />
      </div>

      <div className={`map-search-filters-wrapper ${isFilterOpen ? 'map-search-filters-open' : ''}`}>
        <MapFilterPanel />
      </div>
    </div>
  )
}
