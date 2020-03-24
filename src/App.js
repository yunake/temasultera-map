import React, { useState, useCallback } from 'react';
import { Map, ImageOverlay, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import chultMap from './map.jpg'

import './App.css'

const bounds = [[0, 0], [Math.round(1499 * 0.8), Math.round(1107 * 0.8)]];

const MARKERS = [
  {
    id: Date.now(),
    title: "Жорик обосрался сдесява",
    position: [759, 383.75]
  },
]

function App() {
  const [markers, setMarkers] = useState(MARKERS)

  const [newMarkerPosition, setNMP] = useState(null)

  const [newMarkerTitle, setNMT] = useState('');
 
  const handleMapClick = useCallback((mapEvent) => {
    setNMP(mapEvent.latlng)
  }, [])

  const onTitleChange = useCallback(e => {
    setNMT(e.target.value)
  }, [])

  const onAddMarker = useCallback(() => {
    const newMarker = { 
      id: Date.now(),
      title: newMarkerTitle,
      position: newMarkerPosition
    }

    setMarkers([ ...markers, newMarker ])

    setNMP(null)
  }, [markers, newMarkerTitle, newMarkerPosition])

  return (
    <div>
      <Map
        id="map"
        crs={L.CRS.Simple}
        maxZoom={24}
        zoom={0}
        center={[500, 700]}
        style={{ height: '100vh', width: '50vw' }}
        onClick={handleMapClick}
        onViewportChange={e => {
          debugger
        }}
      >
        <ImageOverlay url={chultMap} bounds={bounds} />

        {
          markers.map(marker =>
            <Marker key={marker.id} position={marker.position}>
              <Popup>
                {marker.title}
              </Popup>
            </Marker>
          )
        }

        {
          newMarkerPosition && 
          <Marker 
            position={newMarkerPosition}
          />
        }

      </Map>

      <div id="panel">
        {
          newMarkerPosition &&
          <div>
            Coordinates: {Math.round(newMarkerPosition.lat)} - {Math.round(newMarkerPosition.lng)}

            <textarea value={newMarkerTitle} onChange={onTitleChange}></textarea>

            <button onClick={onAddMarker}>add marker</button>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
