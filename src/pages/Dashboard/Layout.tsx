import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Overview from './Overview'
import MapFullScreen from './MapFullScreen'

export default function DashboardLayout(){
  return (
    <div style={{display:'flex',height:'100vh',gap:12}}>
      <aside style={{width:280,background:'#071029',padding:12}}>
        <h2>لوحة التحكم</h2>
        <nav style={{marginTop:12}}>
          <ul style={{listStyle:'none',padding:0}}>
            <li><Link to="/app/overview">الرئيسية</Link></li>
            <li><Link to="/app/map">الخريطة</Link></li>
          </ul>
        </nav>
      </aside>
      <main style={{flex:1,padding:12}}>
        <Routes>
          <Route path="overview" element={<Overview/>} />
          <Route path="map" element={<MapFullScreen/>} />
        </Routes>
      </main>
    </div>
  )
}
