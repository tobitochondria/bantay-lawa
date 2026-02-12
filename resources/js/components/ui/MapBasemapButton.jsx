import { useEffect, useRef, useState } from 'react'
import { FiLayers } from 'react-icons/fi'
import MapControlButton from './MapControlButton'

export default function MapBasemapButton() {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const basemapOptions = [
    'OpenStreetMap',
    'Esri World Imagery',
    'Esri Topographic',
    'Esri Streets',
    'ESA WorldCover',
  ]

  return (
    <div ref={wrapperRef} className="map-basemap-control">
      <MapControlButton
        icon={FiLayers}
        label="Basemap"
        onClick={() => setIsOpen((value) => !value)}
      />

      {isOpen ? (
        <div className="card shadow map-basemap-panel border-0">
          <div className="card-body p-3">
            <h6 className="fw-semibold mb-3">Basemap style</h6>

            {basemapOptions.map((option, index) => (
              <div key={option} className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="basemap-style"
                  id={`basemap-${index}`}
                  defaultChecked={index === 0}
                />
                <label className="form-check-label" htmlFor={`basemap-${index}`}>
                  {option}
                </label>
              </div>
            ))}

            <hr className="my-3" />
            <h6 className="fw-semibold mb-2">Overlays</h6>

            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="overlay-contours" />
              <label className="form-check-label" htmlFor="overlay-contours">
                Elevation Contours
              </label>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}