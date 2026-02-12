import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import MapBasemapButton from '../components/ui/MapBasemapButton'
import CoordinatesScale from '../components/ui/CoordinatesScale'
import MapContextMenu from '../components/ui/MapContextMenu'
import { createMapPinDivIcon } from '../components/ui/MapPinIcon'
import MapRightControls from '../components/ui/MapRightControls'
import MapScreenshotButton from '../components/ui/MapScreenshotButton'
import MapSearchBar from '../components/ui/MapSearchBar'
import MapSidebar from '../components/ui/MapSidebar'
import LoginModal from '../components/ui/Auth/LoginModal'
import LakeInfoPanel from '../components/ui/LakeInfoPanel/LakeInfoPanel'

const PHILIPPINES_BOUNDS = L.latLngBounds(
  [4.5, 116.0],
  [21.5, 127.5],
)

export default function MapPage() {
  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  const copyAlertTimerRef = useRef(null)
  const lakeInfoCloseTimerRef = useRef(null)
  const placePinMarkerRef = useRef(null)
  const locationPinMarkerRef = useRef(null)
  const [mapInstance, setMapInstance] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSidebarPinned, setIsSidebarPinned] = useState(false)
  const [contextMenu, setContextMenu] = useState({
    isOpen: false,
    x: 0,
    y: 0,
    lat: null,
    lng: null,
  })
  const [copyAlert, setCopyAlert] = useState({
    isOpen: false,
    title: '',
    subtitle: '',
  })
  const [isLakeInfoOpen, setIsLakeInfoOpen] = useState(false)
  const [isLakeInfoClosing, setIsLakeInfoClosing] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const handleOpenLakeInfoPanel = () => {
    setIsLakeInfoClosing(false)
    setIsLakeInfoOpen(true)
  }

  const handleCloseLakeInfoPanel = () => {
    if (!isLakeInfoOpen && !isLakeInfoClosing) {
      return
    }

    setIsLakeInfoClosing(true)

    if (lakeInfoCloseTimerRef.current) {
      window.clearTimeout(lakeInfoCloseTimerRef.current)
    }

    lakeInfoCloseTimerRef.current = window.setTimeout(() => {
      setIsLakeInfoOpen(false)
      setIsLakeInfoClosing(false)
    }, 350)
  }

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true)
  }

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true)
  }

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false)
  }

  const handleCloseSidebar = () => {
    setIsSidebarPinned(false)
    setIsSidebarOpen(false)
  }

  const handleToggleSidebarPin = () => {
    setIsSidebarPinned((currentValue) => {
      const nextValue = !currentValue

      if (nextValue) {
        setIsSidebarOpen(true)
      }

      return nextValue
    })
  }

  const handleZoomIn = () => {
    if (mapRef.current) {
      mapRef.current.zoomIn()
    }
  }

  const handleZoomOut = () => {
    if (mapRef.current) {
      mapRef.current.zoomOut()
    }
  }

  const createOrUpdatePinMarker = ({ markerRef, lat, lng, colorClass, onRemove }) => {
    if (!mapRef.current) {
      return
    }

    if (!markerRef.current) {
      markerRef.current = L.marker([lat, lng], {
        icon: createMapPinDivIcon(colorClass),
      }).addTo(mapRef.current)

      markerRef.current.bindTooltip(
        '<span class="badge text-bg-light border border-secondary-subtle text-dark">Right-click to remove pin</span>',
        {
          permanent: true,
          direction: 'top',
          offset: [0, -34],
          className: 'map-pin-label-tooltip',
          interactive: false,
        },
      )

      markerRef.current.on('contextmenu', (event) => {
        if (event.originalEvent) {
          L.DomEvent.stop(event.originalEvent)
        }

        markerRef.current?.remove()
        markerRef.current = null
        onRemove()
      })
    } else {
      markerRef.current.setLatLng([lat, lng])
    }
  }

  const handleClearOverlays = () => {
    if (placePinMarkerRef.current) {
      placePinMarkerRef.current.remove()
      placePinMarkerRef.current = null
    }

    if (locationPinMarkerRef.current) {
      locationPinMarkerRef.current.remove()
      locationPinMarkerRef.current = null
    }
  }

  const handleLocate = () => {
    if (!mapRef.current || !navigator.geolocation) {
      return
    }

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      mapRef.current.setView([latitude, longitude], 14)

      createOrUpdatePinMarker({
        markerRef: locationPinMarkerRef,
        lat: latitude,
        lng: longitude,
        colorClass: 'text-primary',
        onRemove: () => {},
      })
    })
  }

  const handleContextMenuAction = async (actionId, coordinates) => {
    const actionCoordinates = coordinates ?? { lat: 0, lng: 0 }

    const handleMeasureDistance = () => {}
    const handleMeasureArea = () => {}
    const handleElevationProfile = () => {}
    const handlePlacePin = () => {
      createOrUpdatePinMarker({
        markerRef: placePinMarkerRef,
        lat: actionCoordinates.lat,
        lng: actionCoordinates.lng,
        colorClass: 'text-danger',
        onRemove: () => {},
      })
    }
    const handleCopyCoordinates = async () => {
      const coordinateText = `${actionCoordinates.lat.toFixed(5)}, ${actionCoordinates.lng.toFixed(5)}`

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(coordinateText)
      }

      setCopyAlert({
        isOpen: true,
        title: 'Coordinates copied to clipboard',
        subtitle: coordinateText,
      })

      if (copyAlertTimerRef.current) {
        window.clearTimeout(copyAlertTimerRef.current)
      }

      copyAlertTimerRef.current = window.setTimeout(() => {
        setCopyAlert((currentValue) => ({ ...currentValue, isOpen: false }))
      }, 2200)
    }

    switch (actionId) {
      case 'measure-distance':
        handleMeasureDistance()
        break
      case 'measure-area':
        handleMeasureArea()
        break
      case 'elevation-profile':
        handleElevationProfile()
        break
      case 'place-pin':
        handlePlacePin()
        break
      case 'copy-coordinates':
        await handleCopyCoordinates()
        break
      default:
        break
    }
  }

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) {
      return
    }

    mapRef.current = L.map(mapContainerRef.current, {
      zoomControl: false,
      maxBounds: PHILIPPINES_BOUNDS,
      maxBoundsViscosity: 1.0,
      minZoom: 6,
    }).setView([14.5995, 120.9842], 13)

    setMapInstance(mapRef.current)

    mapRef.current.fitBounds(PHILIPPINES_BOUNDS)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      noWrap: true,
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(mapRef.current)

    return () => {
      if (mapRef.current) {
        if (placePinMarkerRef.current) {
          placePinMarkerRef.current.remove()
          placePinMarkerRef.current = null
        }

        if (locationPinMarkerRef.current) {
          locationPinMarkerRef.current.remove()
          locationPinMarkerRef.current = null
        }

        mapRef.current.remove()
        mapRef.current = null
        setMapInstance(null)
      }
    }
  }, [])

  useEffect(() => {
    return () => {
      if (copyAlertTimerRef.current) {
        window.clearTimeout(copyAlertTimerRef.current)
      }

      if (lakeInfoCloseTimerRef.current) {
        window.clearTimeout(lakeInfoCloseTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!mapInstance) {
      return
    }

    const handleMapInteraction = () => {
      if (!isSidebarPinned && isSidebarOpen) {
        setIsSidebarOpen(false)
      }
    }

    mapInstance.on('mousedown touchstart movestart zoomstart', handleMapInteraction)

    return () => {
      mapInstance.off('mousedown touchstart movestart zoomstart', handleMapInteraction)
    }
  }, [mapInstance, isSidebarOpen, isSidebarPinned])

  useEffect(() => {
    if (!mapInstance) {
      return
    }

    const closeContextMenu = () => {
      setContextMenu((currentValue) => {
        if (!currentValue.isOpen) {
          return currentValue
        }

        return {
          ...currentValue,
          isOpen: false,
        }
      })
    }

    const handleContextMenu = (event) => {
      event.originalEvent.preventDefault()
      event.originalEvent.stopPropagation()

      setContextMenu({
        isOpen: true,
        x: event.containerPoint.x,
        y: event.containerPoint.y,
        lat: event.latlng.lat,
        lng: event.latlng.lng,
      })
    }

    mapInstance.on('contextmenu', handleContextMenu)
    mapInstance.on('click movestart zoomstart', closeContextMenu)

    return () => {
      mapInstance.off('contextmenu', handleContextMenu)
      mapInstance.off('click movestart zoomstart', closeContextMenu)
    }
  }, [mapInstance])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.repeat) {
        return
      }

      if (event.key.toLowerCase() !== 'l') {
        return
      }

      if (isLakeInfoOpen) {
        handleCloseLakeInfoPanel()
      } else {
        handleOpenLakeInfoPanel()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isLakeInfoOpen, isLakeInfoClosing])

  return (
    <div className="map-page">
      <div ref={mapContainerRef} className="map-canvas" />

      <div className="map-overlay">
        {copyAlert.isOpen ? (
          <div className="alert alert-success shadow-sm map-context-alert mb-0" role="alert">
            <div className="fw-semibold">{copyAlert.title}</div>
            <div className="small">{copyAlert.subtitle}</div>
          </div>
        ) : null}

        <MapSearchBar onMenuClick={handleOpenSidebar} />
        <MapSidebar
          isOpen={isSidebarOpen}
          isPinned={isSidebarPinned}
          onPinToggle={handleToggleSidebarPin}
          onClose={handleCloseSidebar}
          onLoginClick={handleOpenLoginModal}
          mainMap={mapInstance}
        />
        <MapBasemapButton />
        <MapContextMenu
          isOpen={contextMenu.isOpen}
          position={{ x: contextMenu.x, y: contextMenu.y }}
          coordinates={{ lat: contextMenu.lat ?? 0, lng: contextMenu.lng ?? 0 }}
          onAction={handleContextMenuAction}
          onClose={() => setContextMenu((currentValue) => ({ ...currentValue, isOpen: false }))}
        />
        <CoordinatesScale map={mapInstance} />
        <MapRightControls
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onLocate={handleLocate}
          onClearOverlays={handleClearOverlays}
        />
        <MapScreenshotButton />
        <LakeInfoPanel
          isOpen={isLakeInfoOpen}
          isClosing={isLakeInfoClosing}
          onClose={handleCloseLakeInfoPanel}
        />
        <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseLoginModal} />
      </div>
    </div>
  )
}
