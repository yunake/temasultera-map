import React, { useState, useCallback } from 'react';

import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'


const mdParser = new MarkdownIt(/* Markdown-it options */);


function AddNewMarker({ onSubmit, onClear }) {
  const [newMarkerDescription, setNMD] = useState('')

  const handleDescriptionChange = useCallback(({ text }) => {
    setNMD(text)
  }, [])

  const handleSubmit = () => onSubmit({ newMarkerDescription })

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <button className="btn-back" onClick={onClear}>Back</button>
        <h2>Новий маркер: </h2>
      </div>

      <MdEditor
        value=""
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleDescriptionChange}
      />

      <button className="btn-new-marker" onClick={handleSubmit}>Add New Marker</button>
    </div>
  )
}

export default React.memo(AddNewMarker)