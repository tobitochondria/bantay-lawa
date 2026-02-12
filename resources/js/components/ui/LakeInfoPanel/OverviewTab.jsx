import { LAKE_MOCK_DATA } from './mockData'

export default function OverviewTab() {
  return (
    <div className="lake-info-content">
      <div className="row g-2">
        <div className="col-4 fw-semibold">Watershed:</div>
        <div className="col-8">{LAKE_MOCK_DATA.watershed}</div>

        <div className="col-4 fw-semibold">Region:</div>
        <div className="col-8">{LAKE_MOCK_DATA.region}</div>

        <div className="col-4 fw-semibold">Province:</div>
        <div className="col-8">{LAKE_MOCK_DATA.province}</div>

        <div className="col-4 fw-semibold">Municipality/City:</div>
        <div className="col-8">{LAKE_MOCK_DATA.municipality}</div>
      </div>

      <hr className="border-light-subtle my-3" />

      <div className="row g-2">
        <div className="col-4 fw-semibold">Water Body Classification:</div>
        <div className="col-8">{LAKE_MOCK_DATA.classification}</div>

        <div className="col-4 fw-semibold">Surface Area:</div>
        <div className="col-8">{LAKE_MOCK_DATA.surfaceArea}</div>

        <div className="col-4 fw-semibold">Surface Elevation:</div>
        <div className="col-8">{LAKE_MOCK_DATA.surfaceElevation}</div>

        <div className="col-4 fw-semibold">Average Depth:</div>
        <div className="col-8">{LAKE_MOCK_DATA.averageDepth}</div>

        <div className="col-4 fw-semibold">Tributaries:</div>
        <div className="col-8 d-flex flex-wrap gap-1">
          {LAKE_MOCK_DATA.tributaries.map((tributaryName) => (
            <span key={tributaryName} className="badge rounded-pill text-bg-primary-subtle border border-light-subtle text-white">
              {tributaryName}
            </span>
          ))}
        </div>
      </div>

      <p className="small fst-italic mt-4 mb-5 text-white-50">
        Tributaries are known inlets and outlets for this lake. Primary, denoted by a “★”, marks the main channel.
      </p>

      <div className="text-center fst-italic">
        <p className="mb-2">Do you see any missing information or want to submit information regarding this lake?</p>
        <a href="#" className="text-white fw-semibold text-decoration-underline">Click Here</a>
      </div>
    </div>
  )
}
