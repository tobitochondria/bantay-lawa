import MapControlButton from './MapControlButton'

export default function MapRightControls({ onZoomIn, onZoomOut, onLocate, onClearOverlays }) {
  return (
    <div className="map-right-controls d-flex flex-column gap-3">
      <MapControlButton iconClass="bi-bar-chart" label="Statistics" />
      <MapControlButton iconClass="bi-database" label="Data Summary" />
      <MapControlButton iconClass="bi-compass" label="My location" onClick={onLocate} />
      <MapControlButton iconClass="bi-plus-lg" label="Zoom in" onClick={onZoomIn} />
      <MapControlButton iconClass="bi-dash-lg" label="Zoom out" onClick={onZoomOut} />
      <MapControlButton iconClass="bi-trash" label="Clear Overlays" onClick={onClearOverlays} />
    </div>
  )
}
