import React from 'react'
import MapboxGl from 'mapbox-gl'

MapboxGl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || ''

export default function MapProvider({children}:{children:React.ReactNode}){
  return <div style={{height:'100vh',width:'100%'}} id="map-root">{children}</div>
}
