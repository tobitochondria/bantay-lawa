import { FiFilter, FiMenu, FiSearch } from 'react-icons/fi'

export default function MapSearchBar({ onMenuClick }) {
  return (
    <div className="map-search card shadow-sm border-0">
      <div className="input-group">
        <button
          className="btn btn-light map-search-icon text-success"
          type="button"
          aria-label="Menu"
          onClick={onMenuClick}
        >
          <FiMenu size={18} />
        </button>
        <input
          type="text"
          className="form-control border-0"
          placeholder="Search LakeView"
          aria-label="Search LakeView"
        />
        <button className="btn btn-light map-search-icon text-success" type="button" aria-label="Search">
          <FiSearch size={18} />
        </button>
        <button className="btn btn-light map-search-icon text-success" type="button" aria-label="Filter">
          <FiFilter size={18} />
        </button>
      </div>
    </div>
  )
}
