const LAKE_RESULTS = [
  {
    id: 1,
    name: 'Caliraya Reservoir',
    municipality: 'Lumban, Cavinti',
    province: 'Laguna',
    region: 'Region IV-A (CALABARZON)',
    areaKm2: '10.4784',
    areaHa: '1047.84',
  },
  {
    id: 2,
    name: 'Laguna de Bay',
    municipality: 'Multiple cities and municipalities',
    province: 'Laguna',
    region: 'Region IV-A (CALABARZON)',
    areaKm2: '927.0715',
    areaHa: '92707.15',
  },
  {
    id: 3,
    name: 'Laguna Lake (Aklan)',
    municipality: 'Banga',
    province: 'Aklan',
    region: 'Region VI (Western Visayas)',
    areaKm2: '0.0739',
    areaHa: '7.39',
  },
  {
    id: 4,
    name: 'Lake Bunot',
    municipality: 'San Pablo City',
    province: 'Laguna',
    region: 'Region IV-A (CALABARZON)',
    areaKm2: '0.305',
    areaHa: '30.5',
  },
  {
    id: 5,
    name: 'Lake Calibato',
    municipality: 'San Pablo City',
    province: 'Laguna',
    region: 'Region IV-A (CALABARZON)',
    areaKm2: '0.425',
    areaHa: '42.5',
  },
  {
    id: 6,
    name: 'Lake Taal',
    municipality: 'Talisay, San Nicolas',
    province: 'Batangas',
    region: 'Region IV-A (CALABARZON)',
    areaKm2: '234.2',
    areaHa: '23420',
  },
]

const SEARCH_TIPS = [
  {
    title: 'Lake names',
    example: 'e.g., Taal Lake, Laguna de Bay',
  },
  {
    title: 'Analytical queries',
    example: 'e.g., largest lake, deepest lake',
  },
  {
    title: 'Location',
    example: 'e.g., regions, provinces, municipality',
  },
]

export default function MapSearchPanel({ searchTerm }) {
  const normalizedSearchTerm = searchTerm.trim().toLowerCase()

  const matchedLakes = LAKE_RESULTS.filter((lake) => {
    if (!normalizedSearchTerm) {
      return false
    }

    return [lake.name, lake.municipality, lake.province, lake.region].some((fieldValue) =>
      fieldValue.toLowerCase().includes(normalizedSearchTerm),
    )
  })

  if (!normalizedSearchTerm) {
    return (
      <div className="map-search-panel bg-light border-top p-3">
        <div className="map-search-panel-title d-flex align-items-center gap-2 fw-semibold pb-2 mb-2 border-bottom">
          <i className="bi bi-lightbulb text-warning" aria-hidden="true" />
          <span>Search Tips</span>
        </div>

        {SEARCH_TIPS.map((tip) => (
          <div key={tip.title} className="map-search-tip-item py-1">
            <div className="fw-semibold">{tip.title}</div>
            <div className="text-muted">{tip.example}</div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="map-search-panel bg-light border-top p-3">
      <div className="map-search-panel-title d-flex align-items-center gap-2 fw-semibold pb-2 mb-2 border-bottom">
        <i className="bi bi-search" aria-hidden="true" />
        <span>Search results</span>
      </div>

      <div className="map-search-results-list">
        {matchedLakes.length ? (
          matchedLakes.map((lake) => (
            <div key={lake.id} className="map-search-result-item py-2 border-bottom">
              <div className="d-flex align-items-start justify-content-between gap-2">
                <h6 className="mb-1 fw-bold">{lake.name}</h6>
                <span className="text-muted fw-semibold">Lakes</span>
              </div>
              <p className="mb-0 text-muted fw-semibold">
                {lake.name} is in {lake.municipality}, {lake.province}, {lake.region} with the surface area of{' '}
                {lake.areaKm2} km² ({lake.areaHa} ha).
              </p>
            </div>
          ))
        ) : (
          <div className="text-muted py-2">No lakes found for “{searchTerm.trim()}”.</div>
        )}
      </div>
    </div>
  )
}
