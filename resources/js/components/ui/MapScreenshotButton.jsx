export default function MapScreenshotButton() {
  return (
    <button type="button" className="btn btn-light shadow-sm map-screenshot-button text-info">
      <span className="map-control-icon">
        <i className="bi bi-camera" style={{ fontSize: '22px' }} aria-hidden="true" />
      </span>
      <span className="map-control-label">Screenshot</span>
    </button>
  )
}
