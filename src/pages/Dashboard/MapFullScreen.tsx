import React, {useEffect, useRef} from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || ''

export default function DashboardMap(){
  const ref = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)

  useEffect(()=>{
    if(ref.current && !mapRef.current){
      mapRef.current = new mapboxgl.Map({
        container: ref.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [31.2357,30.0444],
        zoom: 11
      })
    }
    return ()=>{mapRef.current?.remove()}
  },[])

  return <div ref={ref} style={{height:'100%',borderRadius:8,overflow:'hidden'}} />
}
