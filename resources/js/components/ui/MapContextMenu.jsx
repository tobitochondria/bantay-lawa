import { useMemo } from 'react'
import { FiCopy, FiMapPin, FiMaximize2, FiTrendingUp } from 'react-icons/fi'
import { TbRulerMeasure } from 'react-icons/tb'

export default function MapContextMenu({ isOpen, position, coordinates, onClose }) {
  const items = useMemo(() => {
    return [
      { id: 'measure-distance', label: 'Measure Distance', icon: TbRulerMeasure },
      { id: 'measure-area', label: 'Measure Area', icon: FiMaximize2 },
      { id: 'elevation-profile', label: 'Elevation Profile', icon: FiTrendingUp },
      { id: 'place-pin', label: 'Place pin here', icon: FiMapPin },
      { id: 'copy-coordinates', label: 'Copy Coordinates', icon: FiCopy },
    ]
  }, [])

  if (!isOpen) {
    return null
  }

  const handleItemClick = async (itemId) => {
    if (itemId === 'copy-coordinates' && coordinates) {
      const coordinateText = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(coordinateText)
      }
    }

    onClose()
  }

  return (
    <div
      className="card border-0 shadow map-context-menu"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      role="menu"
      onContextMenu={(event) => event.preventDefault()}
    >
      <div className="list-group list-group-flush">
        {items.map((item) => {
          const Icon = item.icon

          return (
            <button
              key={item.id}
              type="button"
              className="list-group-item list-group-item-action border-0 d-flex align-items-center gap-2 py-2 px-3"
              onClick={() => handleItemClick(item.id)}
            >
              <Icon size={16} className="text-dark" />
              <span className="text-dark">{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
