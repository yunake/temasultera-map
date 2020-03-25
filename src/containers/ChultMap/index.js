import React from 'react';
import { Map, ImageOverlay, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

import chultMap from './map.jpg'
import ReactMarkdown from 'react-markdown'



const bounds = [[0, 0], [Math.round(1499 * 0.8), Math.round(1107 * 0.8)]];

function ChultMap({ onMapClick, markers, newMarkerPosition }) {

  return (

    <Map
      id="map"
      crs={L.CRS.Simple}
      maxZoom={24}
      zoom={0}
      center={[500, 700]}
      style={{ height: '100vh', width: '50vw' }}
      onClick={onMapClick}
    // onViewportChange={e => {
    //   debugger
    // }}
    >
      <ImageOverlay url={chultMap} bounds={bounds} />

      {
        markers.map(marker =>
          <Marker
            key={marker.id}
            position={marker.position}
          >
            <Popup>
              <ReactMarkdown source={marker.description} />
            </Popup>
          </Marker>
        )
      }

      <Marker
        opacity={newMarkerPosition ? 1 : 0}
        position={newMarkerPosition ? newMarkerPosition : [-10000, -1000]}
      />


    </Map>
  )
}

export default React.memo(ChultMap)