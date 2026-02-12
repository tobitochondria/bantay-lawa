export default function MapControlButton({ icon: Icon, label, onClick, disabled = false }) {
  return (
    <button
      type="button"
      className="btn btn-light shadow-sm map-control-button text-info"
      onClick={onClick}
      disabled={disabled}
    >
      <span className="map-control-icon">{Icon ? <Icon size={20} /> : null}</span>
      <span className="map-control-label">{label}</span>
    </button>
  )
}
