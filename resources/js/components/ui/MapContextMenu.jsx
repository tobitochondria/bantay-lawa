import { useMemo } from 'react'

export default function MapContextMenu({ isOpen, position, coordinates, onAction, onClose }) {
  const items = useMemo(() => {
    return [
      { id: 'measure-distance', label: 'Measure Distance', iconClass: 'bi-rulers' },
      { id: 'measure-area', label: 'Measure Area', iconClass: 'bi-aspect-ratio' },
      { id: 'elevation-profile', label: 'Elevation Profile', iconClass: 'bi-graph-up' },
      { id: 'place-pin', label: 'Place pin here', iconClass: 'bi-geo-alt' },
      { id: 'copy-coordinates', label: 'Copy Coordinates', iconClass: 'bi-copy' },
    ]
  }, [])

  if (!isOpen) {
    return null
  }

  const handleItemClick = (itemId) => {
    onAction(itemId, coordinates)
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
          return (
            <button
              key={item.id}
              type="button"
              className="list-group-item list-group-item-action border-0 d-flex align-items-center gap-2 py-2 px-3"
              onClick={() => handleItemClick(item.id)}
            >
              <i className={`bi ${item.iconClass} text-dark`} aria-hidden="true" />
              <span className="text-dark">{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
