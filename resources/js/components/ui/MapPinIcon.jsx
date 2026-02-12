import L from 'leaflet'
import { renderToStaticMarkup } from 'react-dom/server'

function MapPinIcon({ colorClass }) {
  return (
    <span className="map-pin-icon-wrap">
      <i className={`bi bi-geo-alt-fill map-pin-icon ${colorClass}`} aria-hidden="true" />
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
