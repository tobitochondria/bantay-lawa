import { TESTS_MOCK_DATA } from './mockData'

export default function TestsTab() {
  return (
    <div className="lake-info-content">
      <div className="row g-2 mb-2">
        <div className="col-12 col-lg-5">
          <label className="form-label mb-1">Dataset Source</label>
          <select className="form-select">
            <option>All dataset sources</option>
          </select>
        </div>
        <div className="col-12 col-lg-4">
          <label className="form-label mb-1">Station</label>
          <select className="form-select">
            <option>All Stations</option>
          </select>
        </div>
        <div className="col-12 col-lg-3">
          <label className="form-label mb-1">Year</label>
          <select className="form-select">
            <option>2025 (latest)</option>
          </select>
        </div>
      </div>

      <p className="mb-3">Click on the Station markers to see their data.</p>

      <div className="d-flex flex-column gap-3">
        {TESTS_MOCK_DATA.map((item) => (
          <div key={`${item.date}-${item.station}`} className="card border-light-subtle lake-test-item">
            <div className="card-body d-flex justify-content-between align-items-center gap-3">
              <div>
                <h6 className="mb-1 fw-bold">{item.date}</h6>
                <div>{item.station}</div>
                <div className="text-white-50">{item.source}</div>
              </div>
              <div className="d-flex gap-2">
                <button type="button" className="btn btn-sm btn-outline-light rounded-circle lake-icon-round">
                  <i className="bi bi-eye" aria-hidden="true" />
                </button>
                <button type="button" className="btn btn-sm btn-outline-light rounded-circle lake-icon-round">
                  <i className="bi bi-geo-alt" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
