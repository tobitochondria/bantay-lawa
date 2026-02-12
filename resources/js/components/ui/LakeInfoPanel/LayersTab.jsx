import { LAYERS_MOCK_DATA } from './mockData'

export default function LayersTab() {
  return (
    <div className="lake-info-content">
      <h5 className="mb-3">Layers</h5>

      <div className="mb-4">
        <h6 className="fw-semibold mb-2">Lake layer</h6>
        <div className="card border-light-subtle lake-layer-card">
          <div className="card-body d-flex align-items-start justify-content-between">
            <div>
              <h6 className="mb-1 fw-bold">{LAYERS_MOCK_DATA[0].title}</h6>
              <div>Notes: {LAYERS_MOCK_DATA[0].notes}</div>
            </div>
            <button type="button" className="btn btn-sm btn-outline-light rounded-circle lake-icon-round">
              <i className="bi bi-download" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div>
        <h6 className="fw-semibold mb-2">Watershed layer</h6>
        <div className="card border-light-subtle lake-layer-card">
          <div className="card-body d-flex align-items-start justify-content-between">
            <div>
              <h6 className="mb-1 fw-bold">{LAYERS_MOCK_DATA[1].title}</h6>
              <div>Notes: {LAYERS_MOCK_DATA[1].notes}</div>
            </div>
            <button type="button" className="btn btn-sm btn-outline-light rounded-circle lake-icon-round">
              <i className="bi bi-download" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
