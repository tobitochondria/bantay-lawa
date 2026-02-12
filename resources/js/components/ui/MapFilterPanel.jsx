export default function MapFilterPanel() {
  return (
    <div className="map-search-filters bg-light border-top p-3">
      <div className="row g-2">
        <div className="col-6">
          <label className="form-label mb-1">Region</label>
          <select className="form-select" defaultValue="">
            <option value="">All Regions</option>
          </select>
        </div>

        <div className="col-6">
          <label className="form-label mb-1">Province</label>
          <select className="form-select" defaultValue="">
            <option value="">All Provinces</option>
          </select>
        </div>

        <div className="col-6">
          <label className="form-label mb-1">Municipality/City</label>
          <select className="form-select" defaultValue="">
            <option value="">All Municipalities</option>
          </select>
        </div>

        <div className="col-6">
          <label className="form-label mb-1">Water Body Classification</label>
          <select className="form-select" defaultValue="">
            <option value="">All Classifications</option>
          </select>
        </div>

        <div className="col-6">
          <label className="form-label mb-1">Surface area — min (km²)</label>
          <input type="number" className="form-control" />
        </div>

        <div className="col-6">
          <label className="form-label mb-1">Surface area — max (km²)</label>
          <input type="number" className="form-control" />
        </div>

        <div className="col-6">
          <label className="form-label mb-1">Surface Elev. — min (m)</label>
          <input type="number" className="form-control" />
        </div>

        <div className="col-6">
          <label className="form-label mb-1">Surface Elev. — max (m)</label>
          <input type="number" className="form-control" />
        </div>

        <div className="col-6">
          <label className="form-label mb-1">Average depth — min (m)</label>
          <input type="number" className="form-control" />
        </div>

        <div className="col-6">
          <label className="form-label mb-1">Average depth — max (m)</label>
          <input type="number" className="form-control" />
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-between gap-2 mt-3">
        <span className="text-muted">Showing — lakes.</span>
        <div className="d-flex gap-2">
          <button type="button" className="btn btn-light">
            Reset
          </button>
          <button type="button" className="btn btn-primary">
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}
