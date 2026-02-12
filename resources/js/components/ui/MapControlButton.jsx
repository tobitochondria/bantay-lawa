export default function MapControlButton({ iconClass, label, onClick, disabled = false }) {
  return (
    <button
      type="button"
      className="btn btn-light shadow-sm map-control-button text-info"
      onClick={onClick}
      disabled={disabled}
    >
      <span className="map-control-icon">
        {iconClass ? <i className={`bi ${iconClass}`} style={{ fontSize: '20px' }} aria-hidden="true" /> : null}
      </span>
      <span className="map-control-label">{label}</span>
    </button>
  )
}
