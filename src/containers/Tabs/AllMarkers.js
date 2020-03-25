import React from 'react'
import ReactMarkdown from 'react-markdown'

function AllMarkers({ markers, onDelete }) {
  const handleDelete = marker => () => { onDelete(marker) }

  return (
    <div>
      <h2>AllMarkers</h2>

      {
        markers.map(marker =>
          <div key={marker.id}>
            <button onClick={handleDelete(marker)}>Delete</button>
            <ReactMarkdown source={marker.description} />
          </div>
        )
      }
    </div>
  )
}

export default React.memo(AllMarkers)