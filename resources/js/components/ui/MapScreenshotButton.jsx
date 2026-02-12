import { FiCamera } from 'react-icons/fi'

export default function MapScreenshotButton() {
  return (
    <button type="button" className="btn btn-light shadow-sm map-screenshot-button text-info">
      <span className="map-control-icon">
        <FiCamera size={22} />
      </span>
      <span className="map-control-label">Screenshot</span>
    </button>
  )
}
