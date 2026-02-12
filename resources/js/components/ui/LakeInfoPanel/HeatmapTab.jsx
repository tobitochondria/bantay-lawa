export default function HeatmapTab() {
  return (
    <div className="lake-info-content">
      <h5 className="mb-1">Population Density Heatmap</h5>
      <p className="mb-3 text-white-50">Heatmap of population living around <span className="fw-semibold text-white">Laguna de Bay</span>.</p>

      <div className="d-flex justify-content-between align-items-center mb-1">
        <label className="form-label mb-0">Distance from shoreline (buffer)</label>
        <span className="fw-semibold">0 km</span>
      </div>
      <input type="range" className="form-range mb-2" defaultValue={0} />

      <div className="d-flex align-items-end gap-2 mb-3">
        <div className="flex-grow-1">
          <label className="form-label mb-1">Dataset Year</label>
          <select className="form-select">
            <option>2020 (latest)</option>
          </select>
        </div>
        <button type="button" className="btn btn-outline-light mb-1">
          <i className="bi bi-info-circle" aria-hidden="true" />
        </button>
      </div>

      <div className="card border-light-subtle lake-heatmap-card">
        <div className="card-body">
          <div className="text-white-50 mb-1">Estimated Population</div>
          <h4 className="fw-bold mb-2">≈ 0 people</h4>
          <div className="d-flex gap-2 mb-2">
            <span className="badge text-bg-primary-subtle border border-light-subtle text-white">[Estimate]</span>
            <span className="badge text-bg-primary-subtle border border-light-subtle text-white">0 km ring</span>
          </div>
          <div className="text-white-50">Model-based gridded estimate within the selected buffer from the shoreline.</div>
          <div className="d-flex gap-2 mt-3">
            <button type="button" className="btn btn-outline-light flex-fill">Clear</button>
            <button type="button" className="btn btn-outline-light flex-fill">Show Heatmap</button>
            <button type="button" className="btn btn-outline-light flex-fill">Refresh</button>
          </div>
        </div>
      </div>
    </div>
  )
}
