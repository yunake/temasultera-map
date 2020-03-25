import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'

function AllMarkers({ markers, onDelete }) {
  const [hoveredMarker, setHM] = useState(null)

  const handleDelete = marker => () => { onDelete(marker) }



  return (
    <div>
      <h2>All Markers</h2>

      <div className="card-wrapper">

        {
          // TODO + 2 because, we always render `newMarker` and array starts from 0
          hoveredMarker !== null &&
          <style dangerouslySetInnerHTML={{
            __html: `
            .leaflet-marker-icon:nth-child(${hoveredMarker + 2}) {
              filter:  hue-rotate(425deg)
            }
        `}} />
        }


        {
          markers.map((marker, idx) =>
            <div
              key={marker.id}
              className="marker-card"
              onMouseEnter={() => { setHM(idx) }}
              onMouseLeave={() => { setHM(null) }}
            >

              <div>
                <ReactMarkdown source={marker.description} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <button
                  className="btn-dlt"
                  onClick={handleDelete(marker)}
                >
                  Delete
                </button>

                <button
                  className="btn-dlt"
                >
                  Edit
                </button>
              </div>
            </div>
          )
        }

      </div>

    </div>
  )
}

export default React.memo(AllMarkers)