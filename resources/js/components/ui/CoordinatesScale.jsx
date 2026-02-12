import { useEffect, useMemo, useState } from 'react'
import { FiCrosshair, FiMapPin } from 'react-icons/fi'

const DEFAULT_COORDINATES = {
  lat: 14.5995,
  lng: 120.9842,
}

const SCALE_REFERENCE_PIXELS = 100

function getRoundedScaleValue(meters) {
  const power = 10 ** Math.floor(Math.log10(meters))
  const normalized = meters / power

  let roundedValue = 10

  if (normalized >= 5) {
    roundedValue = 5
  } else if (normalized >= 3) {
    roundedValue = 3
  } else if (normalized >= 2) {
    roundedValue = 2
  } else {
    roundedValue = 1
  }

  return roundedValue * power
}

function formatScaleLabel(meters) {
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(1)} km`
  }

  return `${Math.round(meters)} m`
}

export default function CoordinatesScale({ map }) {
  const [mode, setMode] = useState('live')
  const [coordinates, setCoordinates] = useState(DEFAULT_COORDINATES)
  const [scale, setScale] = useState({
    label: '10.0 km',
    widthPixels: 72,
  })

  const modeLabel = useMemo(() => {
    return mode === 'live' ? 'Live' : 'Pick'
  }, [mode])

  useEffect(() => {
    if (!map) {
      return
    }

    const updateScale = () => {
      const mapSize = map.getSize()
      const yPosition = mapSize.y / 2
      const leftPoint = map.containerPointToLatLng([20, yPosition])
      const rightPoint = map.containerPointToLatLng([20 + SCALE_REFERENCE_PIXELS, yPosition])

      const rawMeters = map.distance(leftPoint, rightPoint)
      const roundedMeters = getRoundedScaleValue(rawMeters)
      const widthPixels = Math.max(
        36,
        Math.min(120, Math.round((SCALE_REFERENCE_PIXELS * roundedMeters) / rawMeters)),
      )

      setScale({
        label: formatScaleLabel(roundedMeters),
        widthPixels,
      })
    }

    const updateByMouseMove = (event) => {
      if (mode !== 'live') {
        return
      }

      setCoordinates({
        lat: event.latlng.lat,
        lng: event.latlng.lng,
      })
    }

    const updateByMapClick = (event) => {
      if (mode !== 'pick') {
        return
      }

      setCoordinates({
        lat: event.latlng.lat,
        lng: event.latlng.lng,
      })
    }

    const updateFromCenter = () => {
      const mapCenter = map.getCenter()

      if (mode === 'live') {
        setCoordinates({
          lat: mapCenter.lat,
          lng: mapCenter.lng,
        })
      }
    }

    updateScale()

    map.on('zoom move resize', updateScale)
    map.on('mousemove', updateByMouseMove)
    map.on('click', updateByMapClick)
    map.on('moveend', updateFromCenter)

    return () => {
      map.off('zoom move resize', updateScale)
      map.off('mousemove', updateByMouseMove)
      map.off('click', updateByMapClick)
      map.off('moveend', updateFromCenter)
    }
  }, [map, mode])

  const handleToggleMode = () => {
    setMode((currentMode) => (currentMode === 'live' ? 'pick' : 'live'))
  }

  return (
    <div className="card border-0 shadow-sm coordinates-scale-card">
      <div className="card-body py-2 px-3">
        <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
          <div className="d-flex align-items-center gap-2 text-dark coordinates-scale-coords">
            <FiMapPin size={15} />
            <span className="small fw-medium coordinates-scale-value">
              {coordinates.lat.toFixed(5)}, {coordinates.lng.toFixed(5)}
            </span>
          </div>

          <button
            type="button"
            className={`btn btn-sm ${mode === 'live' ? 'btn-outline-secondary' : 'btn-primary'} py-0 px-2`}
            onClick={handleToggleMode}
            title="Toggle coordinate mode"
          >
            <span className="d-flex align-items-center gap-1">
              <FiCrosshair size={12} />
              <span className="small">{modeLabel}</span>
            </span>
          </button>
        </div>

        <div className="d-flex justify-content-center mb-1">
          <div
            className="bg-secondary rounded coordinates-scale-bar"
            style={{ width: `${scale.widthPixels}px` }}
          />
        </div>

        <div className="text-center small text-body-secondary">{scale.label}</div>
      </div>
    </div>
  )
}
