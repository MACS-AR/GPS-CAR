import React from 'react'

export default function Login(){
  return (
    <div className="container">
      <div className="header">
        <h1>تسجيل الدخول</h1>
      </div>
      <div className="card" style={{maxWidth:480,margin:'16px auto'}}>
        <form>
          <div style={{marginBottom:8}}>
            <label>البريد الالكتروني</label>
            <input style={{width:'100%',padding:8,marginTop:6}} />
          </div>
          <div style={{marginBottom:8}}>
            <label>كلمة المرور</label>
            <input type="password" style={{width:'100%',padding:8,marginTop:6}} />
          </div>
          <button style={{width:'100%',padding:10,background:'#10b981',border:'none',color:'#fff',borderRadius:6}}>دخول</button>
        </form>
      </div>
    </div>
  )
}
