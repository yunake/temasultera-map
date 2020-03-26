import React, { useState } from 'react'
import MdEditor from 'react-markdown-editor-lite'

import mdParser from '../../markdown'

function AllMarkers({ markers, onDelete, onEdit }) {
  const [hoveredMarker, setHM] = useState(null)
  const [markerToEdit, setMTE] = useState(null)

  const [search, setSearch] = useState('')

  const handleDelete = marker => () => { onDelete(marker) }
  const handleEdit = marker => () => {
    onEdit(marker)
    setMTE(null)
  }

  const markersToShow = markers.filter(marker =>
    marker.description.toLowerCase()
      .includes(search.toLowerCase())
  )

  return (
    <div>
      <h2>All Markers: </h2>

      <div id="search">
        <h4>Search: </h4>

        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        {
          search &&
          <button
            className="btn-dlt"
            onClick={() => setSearch('')}
          >
            X
          </button>
        }
      </div>

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
          markersToShow.map((marker, idx) => {
            const inEditMode = markerToEdit && markerToEdit.id === marker.id

            return (
              <div
                key={marker.id}
                className="marker-card"
                onMouseEnter={() => { setHM(idx) }}
                onMouseLeave={() => { setHM(null) }}
              >

                <div>
                  {
                    inEditMode
                      ? <MdEditor
                        value={markerToEdit.description}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={({ text }) => {
                          setMTE({ ...markerToEdit, description: text })
                        }
                        }
                      />
                      : <div dangerouslySetInnerHTML={{ __html: mdParser.render(marker.description) }} />
                  }
                </div>

                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between',
                  marginLeft: '10px'
                }}>
                  <div>
                    <button
                      style={{ width: '100%', margin: 0, marginBottom: '5px' }}
                      className="btn-dlt btn-delete"
                      onClick={handleDelete(marker)}
                    >
                      Delete
                    </button>

                    <button
                      style={{ width: '100%', margin: 0 }}
                      className="btn-dlt"
                      onClick={() => { setMTE(!inEditMode ? marker : null) }}
                    >
                      {!inEditMode ? 'Edit' : 'Back'}
                    </button>
                  </div>

                  {
                    inEditMode &&
                    <button
                      style={{ width: '100%', margin: 0 }}
                      className="btn-dlt btn-update"
                      onClick={handleEdit(markerToEdit)}
                    >
                      Update
                    </button>
                  }
                </div>
              </div>
            )
          })
        }

        {
          markersToShow.length === 0 &&
          <h2>No such markers</h2>
        }

      </div>

    </div>
  )
}

export default React.memo(AllMarkers)