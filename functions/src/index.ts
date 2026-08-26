// Firebase Cloud Functions (TypeScript) - stubs

import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()
const db = admin.database()
const firestore = admin.firestore()

export const forwardLiveTracking = functions.database.ref('/live_tracking/{driverId}').onWrite(async (change, context)=>{
  const driverId = context.params.driverId
  const after = change.after.exists() ? change.after.val() : null
  if(!after) return null

  const vdDoc = await firestore.collection('vehicleDrivers').doc(driverId).get()
  if(!vdDoc.exists) return null
  const vd = vdDoc.data()!
  const tenantId = vd.tenantId
  if(!tenantId) return null

  const live = {
    latitude: after.latitude,
    longitude: after.longitude,
    speed: after.speed || 0,
    bearing: after.bearing || 0,
    accuracy: after.accuracy || 0,
    battery: after.battery || null,
    gpsStatus: after.gpsStatus || 'unknown',
    internetStatus: after.internetStatus || null,
    deviceId: after.deviceId || vd.deviceId || null,
    appVersion: after.appVersion || null,
    androidVersion: after.androidVersion || null,
    lastUpdate: admin.database.ServerValue.TIMESTAMP,
    driverCode: vd.driverCode || null,
    vehicleName: vd.name || null,
  }

  await db.ref(`/liveLocations/${tenantId}/${driverId}`).set(live)
  await firestore.collection('vehicleDrivers').doc(driverId).update({
    lastSeen: admin.firestore.FieldValue.serverTimestamp(),
    'lastLocation.lat': live.latitude,
    'lastLocation.lng': live.longitude,
    'lastLocation.lastUpdate': admin.firestore.FieldValue.serverTimestamp(),
    'lastLocation.speed': live.speed,
  })

  return null
})

export const createDriver = functions.https.onCall(async (data, context)=>{
  if(!context.auth) throw new functions.https.HttpsError('unauthenticated', 'login required')
  const tenantId = context.auth.token.tenantId
  if(!tenantId) throw new functions.https.HttpsError('permission-denied','No tenant')
  const role = context.auth.token.role
  if(!['owner','admin','dispatcher'].includes(role)) throw new functions.https.HttpsError('permission-denied','Insufficient role')

  const name = data.name || 'بدون اسم'
  let code = ''
  for(let i=0;i<6;i++) code += Math.floor(Math.random()*10).toString()
  code = `DRV-${code}`

  const q = await firestore.collection('vehicleDrivers').where('tenantId','==',tenantId).where('driverCode','==',code).get()
  if(!q.empty){
    code = `DRV-${Date.now().toString().slice(-6)}`
  }

  const docRef = firestore.collection('vehicleDrivers').doc()
  await docRef.set({tenantId, driverCode: code, name, createdAt: admin.firestore.FieldValue.serverTimestamp(), status:'active'})
  await firestore.collection('activityLogs').add({tenantId, actor:context.auth.uid, action:'createDriver', docId:docRef.id, createdAt: admin.firestore.FieldValue.serverTimestamp()})
  return {driverId: docRef.id, code}
})

export const bindDevice = functions.https.onCall(async (data, context)=>{
  if(!context.auth) throw new functions.https.HttpsError('unauthenticated','login required')
  const tenantId = context.auth.token.tenantId
  if(!tenantId) throw new functions.https.HttpsError('permission-denied','No tenant')
  const role = context.auth.token.role
  if(!['owner','admin'].includes(role)) throw new functions.https.HttpsError('permission-denied','Insufficient role')

  const { driverCode, deviceId, deviceMeta } = data
  if(!driverCode || !deviceId) throw new functions.https.HttpsError('invalid-argument','Missing')

  const q = await firestore.collection('vehicleDrivers').where('tenantId','==',tenantId).where('driverCode','==',driverCode).limit(1).get()
  if(q.empty) throw new functions.https.HttpsError('not-found','Driver not found')
  const doc = q.docs[0]
  await doc.ref.update({deviceId, deviceMeta, boundAt: admin.firestore.FieldValue.serverTimestamp()})
  await firestore.collection('activityLogs').add({tenantId, actor:context.auth.uid, action:'bindDevice', docId:doc.id, deviceId, createdAt: admin.firestore.FieldValue.serverTimestamp()})
  return {ok:true}
})
