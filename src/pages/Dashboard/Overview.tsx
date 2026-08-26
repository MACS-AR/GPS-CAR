import React from 'react'
import DashboardMap from './MapFullScreen'

export default function Overview(){
  return (
    <div>
      <h1>نظرة عامة</h1>
      <div style={{height:420,marginTop:12}} className="card">
        <DashboardMap />
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginTop:12}}>
        <div className="card">إجمالي السيارات: 0</div>
        <div className="card">متصل الآن: 0</div>
        <div className="card">التنبيهات: 0</div>
      </div>
    </div>
  )
}
