import L from 'leaflet'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { renderToStaticMarkup } from 'react-dom/server'

function MapPinIcon({ colorClass }) {
  return (
    <span className="map-pin-icon-wrap">
      <FaMapMarkerAlt className={`map-pin-icon ${colorClass}`} />
    </span>
  )
}

export function createMapPinDivIcon(colorClass = 'text-danger') {
  return L.divIcon({
    html: renderToStaticMarkup(<MapPinIcon colorClass={colorClass} />),
    className: 'map-pin-div-icon',
    iconSize: [24, 34],
    iconAnchor: [12, 34],
    popupAnchor: [0, -30],
  })
}
