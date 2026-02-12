import { WATER_QUALITY_METRICS } from './mockData'

export default function WaterQualityTab() {
  const yearOptions = Array.from({ length: 2026 - 1990 + 1 }, (_, index) => 1990 + index)

  return (
    <div className="lake-info-content">
      <div className="row g-2 mb-2">
        <div className="col-6 col-lg-2">
          <label className="form-label mb-1">Year from</label>
          <select className="form-select form-select-sm">
            {yearOptions.map((yearValue) => (
              <option key={`from-${yearValue}`} value={yearValue}>
                {yearValue}
              </option>
            ))}
          </select>
        </div>

        <div className="col-6 col-lg-2">
          <label className="form-label mb-1">Year to</label>
          <select className="form-select form-select-sm">
            {yearOptions.map((yearValue) => (
              <option key={`to-${yearValue}`} value={yearValue}>
                {yearValue}
              </option>
            ))}
          </select>
        </div>

        <div className="col-6 col-lg-2">
          <label className="form-label mb-1">Bucket</label>
          <select className="form-select form-select-sm">
            <option>Month</option>
            <option>Quarter</option>
            <option>Year</option>
          </select>
        </div>

        <div className="col-6 col-lg-3">
          <label className="form-label mb-1">Dataset Source</label>
          <select className="form-select form-select-sm">
            <option>Laguna Lake Development Authority</option>
          </select>
        </div>

        <div className="col-6 col-lg-3">
          <label className="form-label mb-1">Station</label>
          <select className="form-select form-select-sm">
            <option>Central Bay Station</option>
            <option>West Station</option>
            <option>East Station</option>
            <option>North Station</option>
          </select>
        </div>
      </div>

      <p className="mb-1">Click on the Station markers to see their data</p>
      <p className="small text-white-50 mb-3">Parameter thresholds are based on DENR Administrative Order 2021-19 guidelines.</p>

      <div className="d-flex flex-column gap-3">
        {WATER_QUALITY_METRICS.map((metric) => (
          <div key={metric.id} className="card border-light-subtle lake-chart-card">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <h6 className="mb-0 text-warning fw-semibold">{metric.name}</h6>
                <button type="button" className="btn btn-sm btn-outline-light rounded-circle lake-icon-round">
                  <i className="bi bi-info" aria-hidden="true" />
                </button>
              </div>
              <div className="lake-chart-placeholder mb-2" />
              <div className="small text-white-50">{metric.rule}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
