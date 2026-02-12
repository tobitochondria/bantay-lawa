import {
  FiBarChart2,
  FiCompass,
  FiDatabase,
  FiPlus,
  FiMinus,
  FiTrash2,
} from 'react-icons/fi'
import MapControlButton from './MapControlButton'

export default function MapRightControls({ onZoomIn, onZoomOut, onLocate }) {
  return (
    <div className="map-right-controls d-flex flex-column gap-3">
      <MapControlButton icon={FiBarChart2} label="Statistics" />
      <MapControlButton icon={FiDatabase} label="Data Summary" />
      <MapControlButton icon={FiCompass} label="My location" onClick={onLocate} />
      <MapControlButton icon={FiPlus} label="Zoom in" onClick={onZoomIn} />
      <MapControlButton icon={FiMinus} label="Zoom out" onClick={onZoomOut} />
      <MapControlButton icon={FiTrash2} label="Clear Overlays" />
    </div>
  )
}
