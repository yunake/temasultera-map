import React, { useState, useEffect, useCallback } from 'react';

import './App.css'
import 'react-markdown-editor-lite/lib/index.css';


import ChultMap from './containers/ChultMap';
import AddNewMarker from './containers/Tabs/AddNewMarker';
import AllMarkers from './containers/Tabs/AllMarkers';
import SignIn from './containers/Tabs/SignIn';

import {
  storeMarker,
  deleteMarker,
  fetchMarkers,
} from './api'


const navigation = [
  {
    title: 'Markers',
    tab: 'markers'
  },
  {
    title: 'Sign in',
    tab: 'sign_in'
  },
]

function App() {
  const [tab, setTab] = useState(navigation[0].tab)

  const [markers, setMarkers] = useState([])
  const [newMarkerPosition, setNMP] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      const markersFromDB = await fetchMarkers()

      setMarkers(markersFromDB)
    }

    fetch()
  }, [])

  const handleMapClick = useCallback((mapEvent) => {
    setNMP(mapEvent.latlng)
  }, [])

  const handleClearNewMarker = useCallback(() => {
    setNMP(null)
  }, [])

  const onAddMarker = useCallback(({ newMarkerDescription }) => {
    const newMarker = {
      id: Date.now(),
      description: newMarkerDescription,
      position: newMarkerPosition
    }

    setMarkers([...markers, newMarker])

    setNMP(null)

    const nmToStore = { ...newMarker, position: [newMarkerPosition.lat, newMarkerPosition.lng] }

    storeMarker(nmToStore)
      .then(fetchMarkers)
      .then(setMarkers)
  }, [markers, newMarkerPosition])

  const onDeleteMarker = useCallback((marker) => {
    deleteMarker(marker.fid)
      .then(fetchMarkers)
      .then(setMarkers)
  }, [])

  return (
    <div>

      <ChultMap
        onMapClick={handleMapClick}
        markers={markers}
        newMarkerPosition={newMarkerPosition}
      />

      <div id="panel">
        <div style={{ display: 'flex' }}>
          {
            navigation.map(route =>
              <button
                key={route.tab}
                onClick={() => setTab(route.tab)}
              >
                {route.title}
              </button>
            )
          }
        </div>

        {
          newMarkerPosition &&
          <AddNewMarker
            onSubmit={onAddMarker}
            onClear={handleClearNewMarker}
          />
        }

        {
          !newMarkerPosition && tab === navigation[0].tab &&
          <AllMarkers
            markers={markers}
            onDelete={onDeleteMarker}
          />
        }

        {
          !newMarkerPosition && tab === navigation[1].tab &&
          <SignIn />
        }
      </div>

    </div >

  );
}

export default App;
