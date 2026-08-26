# GPS-CAR Phase 2 — Customer Dashboard Architecture

## 📋 System Overview

```
┌─────────────────────────────────────────────────────────────┐
│              Customer Dashboard (Web)                       │
│              React + Vite + TypeScript                      │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         Firebase Services & Cloud Functions                │
│  ├─ Authentication                                          │
│  ├─ Firestore (Historical Data)                            │
│  ├─ Realtime Database (Live Tracking)                      │
│  ├─ Cloud Functions (Business Logic)                       │
│  └─ Cloud Messaging (Notifications)                        │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│            Android App (Phase 1)                            │
│         ├─ Live Location Stream                             │
│         ├─ Device Binding                                   │
│         └─ Driver Code Registration                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Folder Structure

```
src/
├── components/              # Reusable UI Components
│   ├── Map/
│   │   ├── MapContainer.tsx
│   │   ├── VehicleMarker.tsx
│   │   ├── RoutePolyline.tsx
│   │   └── GeofenceLayer.tsx
│   ├── Layout/
│   │   ├── Sidebar.tsx
│   │   ├── BottomNav.tsx
│   │   ├── Header.tsx
│   │   └── Navbar.tsx
│   ├── Dashboard/
│   │   ├── StatsCard.tsx
│   │   ├── VehicleList.tsx
│   │   ├── AlertsList.tsx
│   │   └── ChartComponent.tsx
│   ├── Auth/
│   │   ├── LoginForm.tsx
│   │   ├── SignupForm.tsx
│   │   └── ForgotPasswordForm.tsx
│   ├── VehicleDriver/
│   │   ├── VehicleForm.tsx
│   │   ├── VehicleDetail.tsx
│   │   ├── CodeGenerator.tsx
│   │   └── DeviceBinding.tsx
│   ├── Geofence/
│   │   ├── GeofenceForm.tsx
│   │   ├── GeofenceList.tsx
│   │   └── GeofenceDrawing.tsx
│   ├── Trips/
│   │   ├── TripCard.tsx
│   │   ├── TripDetails.tsx
│   │   └── TripPolyline.tsx
│   ├── Reports/
│   │   ├── ReportFilters.tsx
│   │   ├── ReportCharts.tsx
│   │   └── ExportButton.tsx
│   ├── Notifications/
│   │   ├── NotificationCenter.tsx
│   │   ├── NotificationItem.tsx
│   │   └── NotificationBell.tsx
│   ├── Users/
│   │   ├── UserList.tsx
│   │   ├── UserForm.tsx
│   │   └── RoleSelector.tsx
│   ├── Subscription/
│   │   ├── PlanCard.tsx
│   │   ├── SubscriptionStatus.tsx
│   │   └── BillingHistory.tsx
│   ├── Support/
│   │   ├── TicketForm.tsx
│   │   ├── TicketList.tsx
│   │   └── TicketDetail.tsx
│   └── Common/
│       ├── Button.tsx
│       ├── Modal.tsx
│       ├── Input.tsx
│       ├── Select.tsx
│       ├── Toast.tsx
│       ├── Loading.tsx
│       └── EmptyState.tsx
├── pages/
│   ├── Auth/
│   │   ├── Login.tsx
│   │   ├── SignupCompany.tsx
│   │   ├── SignupIndividual.tsx
│   │   └── ForgotPassword.tsx
│   ├── Dashboard/
│   │   ├── Layout.tsx
│   │   ├── Home.tsx
│   │   ├── Map.tsx
│   │   └── index.tsx
│   ├── VehicleDriver/
│   │   ├── List.tsx
│   │   ├── Detail.tsx
│   │   ├── Add.tsx
│   │   └── Edit.tsx
│   ├── Trips/
│   │   ├── List.tsx
│   │   ├── Detail.tsx
│   │   └── History.tsx
│   ├── Geofencing/
│   │   ├── List.tsx
│   │   ├── Create.tsx
│   │   └── Edit.tsx
│   ├── Alerts/
│   │   ├── List.tsx
│   │   ├── Detail.tsx
│   │   └── Settings.tsx
│   ├── Reports/
│   │   ├── Dashboard.tsx
│   │   ├── Daily.tsx
│   │   ├── Weekly.tsx
│   │   ├── Monthly.tsx
│   │   ├── Speed.tsx
│   │   ├── Distance.tsx
│   │   ├── Stops.tsx
│   │   └── Trips.tsx
│   ├── Notifications/
│   │   └── Center.tsx
│   ├── Users/
│   │   ├── List.tsx
│   │   ├── Add.tsx
│   │   └── Edit.tsx
│   ├── Subscription/
│   │   ├── Current.tsx
│   │   ├── Plans.tsx
│   │   ├── History.tsx
│   │   └── Expired.tsx
│   ├── Billing/
│   │   ├── Invoices.tsx
│   │   └── Payment.tsx
│   ├── Support/
│   │   ├── Tickets.tsx
│   │   └── Create.tsx
│   ├── Settings/
│   │   ├── Account.tsx
│   │   ├── General.tsx
│   │   └── Notifications.tsx
│   ├── Profile/
│   │   └── View.tsx
│   └── NotFound.tsx
├── lib/
│   ├── firebase/
│   │   ├── config.ts
│   │   ├── auth.ts
│   │   ├── firestore.ts
│   │   ├── rtdb.ts
│   │   └── messaging.ts
│   ├── services/
│   │   ├── tenant.ts
│   │   ├── vehicleDriver.ts
│   │   ├── trip.ts
│   │   ├── geofence.ts
│   │   ├── alert.ts
│   │   ├── notification.ts
│   │   ├── user.ts
│   │   ├── subscription.ts
│   │   ├── billing.ts
│   │   ├── support.ts
│   │   ├── report.ts
│   │   ├── location.ts
│   │   └── sharing.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useTenant.ts
│   │   ├── useVehicleDrivers.ts
│   │   ├── useLiveTracking.ts
│   │   ├── useGeofences.ts
│   │   ├── useTrips.ts
│   │   ├── useAlerts.ts
│   │   ├── useNotifications.ts
│   │   ├── usePagination.ts
│   │   └── useLocalStorage.ts
│   ├── stores/
│   │   ├── auth.store.ts
│   │   ├── tenant.store.ts
│   │   ├── vehicles.store.ts
│   │   ├── ui.store.ts
│   │   ├── map.store.ts
│   │   └── notifications.store.ts
│   ├── utils/
│   │   ├── formatting.ts
│   │   ├── validators.ts
│   │   ├── constants.ts
│   │   ├── date.ts
│   │   ├── geo.ts
│   │   ├── map.ts
│   │   ├── permission.ts
│   │   └── crypto.ts
│   ├── types/
│   │   ├── index.ts
│   │   ├── tenant.ts
│   │   ├── user.ts
│   │   ├── vehicleDriver.ts
│   │   ├── location.ts
│   │   ├── trip.ts
│   │   ├── alert.ts
│   │   ├── geofence.ts
│   │   ├── notification.ts
│   │   ├── subscription.ts
│   │   ├── billing.ts
│   │   ├── support.ts
│   │   └── report.ts
│   └── constants/
│       ├── roles.ts
│       ├── permissions.ts
│       ├── vehicleStates.ts
│       ├── alertTypes.ts
│       └── config.ts
├── styles/
│   ├── globals.css
│   ├── variables.css
│   ├── responsive.css
│   ├── dark-mode.css
│   └── animations.css
├── hooks/
│   └── (custom hooks)
├── App.tsx
├── App.css
├── main.tsx
└── index.css

functions/
├── src/
│   ├── index.ts
│   ├── auth/
│   │   ├── signupCompany.ts
│   │   ├── signupIndividual.ts
│   │   └── setupTenant.ts
│   ├── vehicleDriver/
│   │   ├── generateDriverCode.ts
│   │   ├── bindDevice.ts
│   │   └── updateLocation.ts
│   ├── alerts/
│   │   ├── checkSpeedViolation.ts
│   │   ├── checkGeofence.ts
│   │   ├── checkStopDuration.ts
│   │   └── sendAlert.ts
│   ├── trips/
│   │   ├── startTrip.ts
│   │   ├── endTrip.ts
│   │   ├── calculateMetrics.ts
│   │   └── processStops.ts
│   ├── notifications/
│   │   ├── sendNotification.ts
│   │   └── handleNotificationClick.ts
│   ├── subscriptions/
│   │   ├── createSubscription.ts
│   │   ├── renewSubscription.ts
│   │   └── expireSubscription.ts
│   └── utils/
│       ├── logger.ts
│       ├── validators.ts
│       ├── geo.ts
│       └── date.ts
├── tsconfig.json
└── package.json

infra/
├── firestore.rules
├── rtdb.rules
└── storage.rules
```

---

## 🗄️ Firebase Data Model

### Firestore Collections

```
tenants/{tenantId}
├── type: "company" | "individual"
├── name: string
├── email: string
├── phone: string
├── province: string (للشركات)
├── activityType: string (للشركات)
├── expectedVehicles: number (للشركات)
├── logo: string
├── timezone: string
├── speedUnit: "km/h" | "mph"
├── distanceUnit: "km" | "mi"
├── maxVehicles: number
├── subscriptionStatus: "trial" | "active" | "expired" | "cancelled"
├── subscriptionStartDate: timestamp
├── subscriptionEndDate: timestamp
├── createdAt: timestamp
├── updatedAt: timestamp
└── settings: {
    maxSpeed: number,
    offlineTimeout: number,
    stopTimeout: number,
    enableAlerts: boolean,
    enableGeofencing: boolean,
    enableReports: boolean
  }

users/{userId}
├── tenantId: string
├── email: string
├── name: string
├── phone: string
├── role: "owner" | "admin" | "dispatcher" | "viewer" | "accountant"
├── status: "active" | "inactive" | "suspended"
├── lastLogin: timestamp
├── permissions: {
    canViewVehicles: boolean,
    canAddVehicles: boolean,
    canDeleteVehicles: boolean,
    canViewTrips: boolean,
    canViewReports: boolean,
    canManageUsers: boolean,
    canManageGeofences: boolean,
    canViewBilling: boolean,
    canManageSubscription: boolean,
    canViewSupport: boolean,
    canCreateSupport: boolean
  }
├── createdAt: timestamp
└── updatedAt: timestamp

vehicleDrivers/{vehicleDriverId}
├── tenantId: string
├── name: string
├── phone: string
├── driverCode: string (format: DRV-XXXXXX, unique per tenant)
├── deviceId: string (optional, filled when device binds)
├── status: "online" | "offline"
├── lastLocation: {
    latitude: number,
    longitude: number,
    timestamp: timestamp,
    accuracy: number,
    heading: number,
    speed: number
  }
├── currentTrip: {
    tripId: string,
    startTime: timestamp,
    startLocation: {latitude, longitude}
  } | null
├── battery: number (0-100)
├── gpsStatus: "active" | "inactive" | "low_accuracy"
├── internetStatus: "connected" | "disconnected"
├── isMoving: boolean
├── currentSpeed: number
├── lastUpdate: timestamp
├── offlineThreshold: number (minutes, e.g., 5)
├── maxSpeed: number (km/h or mph)
├── alertSettings: {
    enableSpeedAlert: boolean,
    enableGeofenceAlert: boolean,
    enableOfflineAlert: boolean,
    enableBatteryAlert: boolean,
    enableStopAlert: boolean,
    stopDurationThreshold: number (minutes)
  }
├── createdAt: timestamp
└── updatedAt: timestamp

trips/{tripId}
├── tenantId: string
├── vehicleDriverId: string
├── startTime: timestamp
├── endTime: timestamp (null if trip is active)
├── startLocation: {latitude, longitude}
├── endLocation: {latitude, longitude}
├── distance: number (km or mi)
├── duration: number (seconds)
├── averageSpeed: number
├── maxSpeed: number
├── stops: [
│   {
│     timestamp: timestamp,
│     location: {latitude, longitude},
│     duration: number (seconds)
│   }
│ ]
├── polyline: string (encoded Google polyline)
├── status: "active" | "completed" | "cancelled"
├── createdAt: timestamp
└── updatedAt: timestamp

geofences/{geofenceId}
├── tenantId: string
├── name: string
├── type: "safe" | "restricted" | "company" | "home" | "warehouse" | "branch"
├── center: {latitude, longitude}
├── radius: number (meters, for circle type)
├── coordinates: [{latitude, longitude}] (for polygon type)
├── shapeType: "circle" | "polygon"
├── enabled: boolean
├── enterAlert: boolean
├── exitAlert: boolean
├── createdAt: timestamp
└── updatedAt: timestamp

alerts/{alertId}
├── tenantId: string
├── vehicleDriverId: string
├── type: "speed_violation" | "geofence_enter" | "geofence_exit" | "offline" | "battery_low" | "fake_gps" | "app_old_version" | "sync_failure" | "stop_duration" | "outside_hours"
├── severity: "info" | "warning" | "critical"
├── message: string
├── data: {
│   speed: number,
│   maxSpeed: number,
│   location: {latitude, longitude},
│   geofenceName: string,
│   ...
│ }
├── timestamp: timestamp
├── read: boolean
├── readAt: timestamp (optional)
├── createdAt: timestamp
└── updatedAt: timestamp

notifications/{notificationId}
├── tenantId: string
├── userId: string (optional, if personal)
├── type: "alert" | "trip_started" | "trip_ended" | "subscription_warning" | "subscription_expired" | "new_feature"
├── title: string
├── body: string
├── data: {
│   alertId: string,
│   vehicleDriverId: string,
│   ...
│ }
├── read: boolean
├── readAt: timestamp (optional)
├── fcmToken: string (for sending push notifications)
├── createdAt: timestamp
└── updatedAt: timestamp

subscriptions/{subscriptionId}
├── tenantId: string
├── planId: string
├── planName: string (e.g., "Basic", "Professional", "Enterprise")
├── status: "trial" | "active" | "expired" | "cancelled"
├── maxVehicles: number
├── maxUsers: number
├── price: number
├── currency: string
├── billingCycle: "monthly" | "yearly"
├── autoRenew: boolean
├── startDate: timestamp
├── endDate: timestamp
├── trialDaysRemaining: number
├── createdAt: timestamp
└── updatedAt: timestamp

billing/{billingId}
├── tenantId: string
├── subscriptionId: string
├── invoiceNumber: string
├── amount: number
├── currency: string
├── status: "pending" | "paid" | "failed" | "cancelled"
├── billingDate: timestamp
├── dueDate: timestamp
├── paidAt: timestamp (optional)
├── description: string
├── createdAt: timestamp
└── updatedAt: timestamp

supportTickets/{ticketId}
├── tenantId: string
├── userId: string
├── title: string
├── description: string
├── category: string
├── priority: "low" | "medium" | "high"
├── status: "open" | "pending" | "answered" | "closed"
├── attachment: string (URL, optional)
├── replies: [
│   {
│     userId: string,
│     message: string,
│     timestamp: timestamp,
│     attachment: string (optional)
│   }
│ ]
├── createdAt: timestamp
└── updatedAt: timestamp

activityLog/{logId}
├── tenantId: string
├── userId: string
├── action: string
├── entity: string
├── entityId: string
├── oldData: object (optional)
├── newData: object (optional)
├── timestamp: timestamp
└── ipAddress: string (optional)

locationHistory/{vehicleDriverId}/{date}/{locationId}
├── tenantId: string
├── latitude: number
├── longitude: number
├── speed: number
├── heading: number
├── accuracy: number
├── timestamp: timestamp
├── batteryLevel: number
├── isMoving: boolean
└── tripId: string (optional)

sharingLinks/{linkId}
├── tenantId: string
├── vehicleDriverId: string
├── token: string (random, unique)
├── expiresAt: timestamp
├── createdAt: timestamp
├── createdBy: userId
├── readOnly: boolean
└── lastAccessedAt: timestamp (optional)
```

---

## 🔄 Real-time Database (RTDB) Nodes

```
ingest/live_tracking/{driverId}
├── latitude: number
├── longitude: number
├── speed: number
├── heading: number
├── accuracy: number
├── battery: number
├── gpsStatus: "active" | "inactive"
├── internetStatus: "connected" | "disconnected"
├── timestamp: timestamp
└── deviceId: string

liveLocations/{tenantId}/{vehicleDriverId}
├── latitude: number
├── longitude: number
├── speed: number
├── heading: number
├── accuracy: number
├── battery: number
├── gpsStatus: "active" | "inactive"
├── internetStatus: "connected" | "disconnected"
├── isMoving: boolean
├── timestamp: timestamp
└── updatedAt: timestamp

deviceStatus/{vehicleDriverId}
├── online: boolean
├── lastSeen: timestamp
├── appVersion: string
├── androidVersion: string
├── lastSync: timestamp
└── uptime: number (seconds)
```

---

## 🔐 Security Rules Summary

- **Tenant Isolation**: Custom Claims verify `tenantId`
- **Role-Based Access**: `role` in Custom Claims controls operations
- **Field-Level Security**: Rules check individual field access
- **Write Protection**: Only authorized roles can write to collections
- **Real-time Rules**: RTDB validates `tenantId` and `role`

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TypeScript, Vite |
| Styling | CSS3 + Variables (Dark/Light Mode) |
| State Management | Zustand |
| HTTP Client | SWR |
| Maps | Mapbox GL JS |
| Maps Fallback | Leaflet + OpenStreetMap |
| Backend | Firebase Cloud Functions |
| Database | Firestore + Realtime Database |
| Auth | Firebase Authentication |
| Messaging | Firebase Cloud Messaging |
| Hosting | Vercel |
| Internationalization | i18next (Arabic/English ready) |

---

## 📱 Responsive Design

- **Mobile First**: Bottom Navigation (50px fixed)
- **Tablet**: Responsive Grid (2-3 columns)
- **Desktop**: Sidebar (250px) + Main Content
- **Full Screen Map**: Hamburger menu, collapsible sidebar
- **RTL Support**: Built-in Arabic support

---

## 🔄 Authentication Flow

```
1. User visits /login
2. Enter email + password
3. Firebase Authentication verifies
4. Custom Claims added (tenantId, role, type)
5. Session persisted in localStorage
6. Redirect to /app
7. Protected routes check auth state
8. On logout: clear session + Firebase sign out
```

---

## 🚀 Performance Optimization

- **Code Splitting**: By route using React.lazy()
- **Image Optimization**: Lazy loading for avatars
- **Firebase Listeners**: Only active on focused page
- **Memoization**: useMemo/useCallback for expensive ops
- **Pagination**: Load 20-50 items at a time
- **Caching**: Local cache with stale-while-revalidate
- **Map Optimization**: Animate markers instead of redraw
- **Query Indexes**: Composite indexes for common queries

---

## 📊 Analytics & Reporting

- Charts via Chart.js or Recharts
- Export: PDF (jsPDF), CSV (csv-stringify)
- Aggregated data: By day, week, month
- Real-time metrics: Speed, distance, stops
- Historical data: Lazy-loaded from Firestore

---

## 🔔 Notifications

- **Push**: Firebase Cloud Messaging (FCM)
- **In-App**: Zustand store + Toast notifications
- **Notification Center**: Firestore collection + real-time listener
- **Email**: Optional via Cloud Functions

---

## 🌍 Multi-Tenant Isolation

1. **Authentication**: Firebase Auth + Custom Claims
2. **Firestore**: Security Rules check `tenantId`
3. **RTDB**: Nodes grouped by `tenantId`
4. **Cloud Functions**: Validate `tenantId` from Claims
5. **Frontend**: All queries filtered by current tenant
6. **No Data Leakage**: Impossible to query other tenants

---

## ✅ Deployment Checklist

- [ ] Environment variables set
- [ ] Firebase config correct
- [ ] Security Rules deployed
- [ ] Cloud Functions deployed
- [ ] Service Worker configured (PWA)
- [ ] Custom domain configured
- [ ] Analytics enabled
- [ ] Backup strategy defined
- [ ] Error tracking enabled (Sentry)
- [ ] Performance monitoring enabled
