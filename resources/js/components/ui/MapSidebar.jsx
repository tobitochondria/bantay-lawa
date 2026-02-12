import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'

const SOUTHEAST_ASIA_BOUNDS = L.latLngBounds(
  [-12.0, 90.0],
  [28.0, 142.0],
)

export default function MapSidebar({ isOpen, isPinned, onPinToggle, onClose, mainMap }) {
  const miniMapContainerRef = useRef(null)
  const miniMapRef = useRef(null)
  const viewportRectangleRef = useRef(null)
  const [isAboutDataOpen, setIsAboutDataOpen] = useState(true)

  useEffect(() => {
    if (!miniMapContainerRef.current || miniMapRef.current) {
      return
    }

    miniMapRef.current = L.map(miniMapContainerRef.current, {
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      tap: false,
      touchZoom: false,
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(miniMapRef.current)

    viewportRectangleRef.current = L.rectangle(SOUTHEAST_ASIA_BOUNDS, {
      color: 'var(--bs-danger)',
      fillColor: 'var(--bs-danger)',
      fillOpacity: 0.1,
      weight: 2,
    }).addTo(miniMapRef.current)

    miniMapRef.current.fitBounds(SOUTHEAST_ASIA_BOUNDS)

    return () => {
      if (miniMapRef.current) {
        miniMapRef.current.remove()
        miniMapRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!isOpen || !miniMapRef.current) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      miniMapRef.current.invalidateSize()
    }, 220)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [isOpen])

  useEffect(() => {
    if (!mainMap || !miniMapRef.current || !viewportRectangleRef.current) {
      return
    }

    const syncFromMainMap = () => {
      const center = mainMap.getCenter()
      const synchronizedZoom = Math.max(2, mainMap.getZoom() - 4)

      miniMapRef.current.setView(center, synchronizedZoom, { animate: false })
      viewportRectangleRef.current.setBounds(mainMap.getBounds())
    }

    syncFromMainMap()

    mainMap.on('move zoom', syncFromMainMap)

    return () => {
      mainMap.off('move zoom', syncFromMainMap)
    }
  }, [mainMap])

  return (
    <>
      <div
        className={`offcanvas offcanvas-start map-sidebar ${isOpen ? 'map-sidebar-open' : ''}`}
        tabIndex="-1"
        aria-modal={isOpen ? 'true' : undefined}
        role="dialog"
        aria-hidden={!isOpen}
      >
        <div className="offcanvas-header border-bottom map-sidebar-header">
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-geo-alt text-success" style={{ fontSize: '22px' }} aria-hidden="true" />
            <h5 className="offcanvas-title mb-0 fw-semibold">LakeView PH</h5>
          </div>

          <div className="d-flex align-items-center gap-2 map-sidebar-header-actions">
            <button
              type="button"
              className={`btn btn-link p-1 ${isPinned ? 'text-success' : 'text-dark'}`}
              aria-label="Pin sidebar"
              onClick={onPinToggle}
            >
              <i className="bi bi-pin-angle" style={{ fontSize: '18px' }} aria-hidden="true" />
            </button>
            <button type="button" className="btn btn-link text-dark p-1" aria-label="Close" onClick={onClose}>
              <i className="bi bi-x-lg" style={{ fontSize: '18px' }} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="offcanvas-body d-flex flex-column p-0">
          <div className="p-3 border-bottom">
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-body p-0">
                <div ref={miniMapContainerRef} className="map-sidebar-minimap rounded-4" />
              </div>
            </div>

            <button type="button" className="btn btn-link text-decoration-none p-3 text-info d-flex align-items-center gap-2 w-100 mt-2">
              <i className="bi bi-send" style={{ fontSize: '16px' }} aria-hidden="true" />
              <span>Submit Feedback</span>
            </button>

            <div className="bg-light rounded-4 px-2 py-2">
              <button
                type="button"
                className="btn btn-link text-decoration-none text-info d-flex align-items-center justify-content-between w-100 px-2"
                onClick={() => setIsAboutDataOpen((value) => !value)}
                aria-expanded={isAboutDataOpen}
              >
                <span className="d-flex align-items-center gap-2">
                  <i className="bi bi-database" style={{ fontSize: '18px' }} aria-hidden="true" />
                  <span>About the Data</span>
                </span>
                {isAboutDataOpen ? (
                  <i className="bi bi-chevron-up" style={{ fontSize: '16px' }} aria-hidden="true" />
                ) : (
                  <i className="bi bi-chevron-down" style={{ fontSize: '16px' }} aria-hidden="true" />
                )}
              </button>

              {isAboutDataOpen ? (
                <div className="px-4 pb-1 d-flex flex-column gap-1">
                  <a href="#" className="text-decoration-none">Terms & Conditions</a>
                  <a href="#" className="text-decoration-none">Data Privacy Disclaimer</a>
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-auto border-top p-3">
            <button type="button" className="btn btn-link text-decoration-none text-dark d-flex align-items-center gap-2 px-2">
              <i className="bi bi-box-arrow-in-right text-success" style={{ fontSize: '16px' }} aria-hidden="true" />
              <span>Log in</span>
            </button>
          </div>
        </div>
      </div>

    </>
  )
}
