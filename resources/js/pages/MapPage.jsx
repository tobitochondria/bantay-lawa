import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import MapBasemapButton from '../components/ui/MapBasemapButton'
import CoordinatesScale from '../components/ui/CoordinatesScale'
import MapContextMenu from '../components/ui/MapContextMenu'
import MapRightControls from '../components/ui/MapRightControls'
import MapScreenshotButton from '../components/ui/MapScreenshotButton'
import MapSearchBar from '../components/ui/MapSearchBar'
import MapSidebar from '../components/ui/MapSidebar'

const PHILIPPINES_BOUNDS = L.latLngBounds(
  [4.5, 116.0],
  [21.5, 127.5],
)

export default function MapPage() {
  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
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

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true)
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

  const handleLocate = () => {
    if (!mapRef.current || !navigator.geolocation) {
      return
    }

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      mapRef.current.setView([latitude, longitude], 14)
    })
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
        mapRef.current.remove()
        mapRef.current = null
        setMapInstance(null)
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

  return (
    <div className="map-page">
      <div ref={mapContainerRef} className="map-canvas" />

      <div className="map-overlay">
        <MapSearchBar onMenuClick={handleOpenSidebar} />
        <MapSidebar
          isOpen={isSidebarOpen}
          isPinned={isSidebarPinned}
          onPinToggle={handleToggleSidebarPin}
          onClose={handleCloseSidebar}
          mainMap={mapInstance}
        />
        <MapBasemapButton />
        <MapContextMenu
          isOpen={contextMenu.isOpen}
          position={{ x: contextMenu.x, y: contextMenu.y }}
          coordinates={{ lat: contextMenu.lat ?? 0, lng: contextMenu.lng ?? 0 }}
          onClose={() => setContextMenu((currentValue) => ({ ...currentValue, isOpen: false }))}
        />
        <CoordinatesScale map={mapInstance} />
        <MapRightControls
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onLocate={handleLocate}
        />
        <MapScreenshotButton />
      </div>
    </div>
  )
}