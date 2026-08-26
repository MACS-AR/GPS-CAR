import React from 'react'

export default function SignupCompany(){
  return (
    <div className="container">
      <div className="header"><h1>إنشاء حساب شركة</h1></div>
      <div className="card" style={{maxWidth:720,margin:'16px auto'}}>
        <form>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
            <div>
              <label>اسم الشركة</label>
              <input style={{width:'100%',padding:8,marginTop:6}} />
            </div>
            <div>
              <label>اسم المسؤول</label>
              <input style={{width:'100%',padding:8,marginTop:6}} />
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginTop:8}}>
            <div>
              <label>الهاتف</label>
              <input style={{width:'100%',padding:8,marginTop:6}} />
            </div>
            <div>
              <label>البريد الإلكتروني</label>
              <input style={{width:'100%',padding:8,marginTop:6}} />
            </div>
          </div>
          <div style={{marginTop:8}}>
            <label>كلمة المرور</label>
            <input type="password" style={{width:'100%',padding:8,marginTop:6}} />
          </div>
          <div style={{marginTop:10}}>
            <button style={{width:'100%',padding:10,background:'#2563eb',border:'none',color:'#fff',borderRadius:6}}>إنشاء حساب</button>
          </div>
        </form>
      </div>
    </div>
  )
}
