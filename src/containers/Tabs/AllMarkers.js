import React from 'react'
import ReactMarkdown from 'react-markdown'

function AllMarkers({ markers, onDelete }) {
  const handleDelete = marker => () => { onDelete(marker) }

  return (
    <div>
      <h2>All Markers</h2>

      <div className="card-wrapper">

        {
          markers.map(marker =>
            <div
              key={marker.id}
              className="marker-card"
            >
              <button
                className="btn-dlt"
                onClick={handleDelete(marker)}
              >
                Delete
              </button>

              <div>
                <ReactMarkdown source={marker.description} />
              </div>
            </div>
          )
        }

      </div>

    </div>
  )
}

export default React.memo(AllMarkers)