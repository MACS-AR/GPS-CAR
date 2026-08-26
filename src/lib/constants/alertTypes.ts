export const ALERT_TYPES = {
  SPEED_VIOLATION: 'speed_violation',
  GEOFENCE_ENTER: 'geofence_enter',
  GEOFENCE_EXIT: 'geofence_exit',
  OFFLINE: 'offline',
  BATTERY_LOW: 'battery_low',
  FAKE_GPS: 'fake_gps',
  APP_OLD_VERSION: 'app_old_version',
  SYNC_FAILURE: 'sync_failure',
  STOP_DURATION: 'stop_duration',
  OUTSIDE_HOURS: 'outside_hours',
} as const;

export const ALERT_TYPE_LABELS = {
  [ALERT_TYPES.SPEED_VIOLATION]: 'تجاوز السرعة',
  [ALERT_TYPES.GEOFENCE_ENTER]: 'دخول منطقة جغرافية',
  [ALERT_TYPES.GEOFENCE_EXIT]: 'خروج من منطقة جغرافية',
  [ALERT_TYPES.OFFLINE]: 'غير متصل',
  [ALERT_TYPES.BATTERY_LOW]: 'بطارية منخفضة',
  [ALERT_TYPES.FAKE_GPS]: 'GPS مزيف',
  [ALERT_TYPES.APP_OLD_VERSION]: 'إصدار التطبيق قديم',
  [ALERT_TYPES.SYNC_FAILURE]: 'فشل المزامنة',
  [ALERT_TYPES.STOP_DURATION]: 'مدة التوقف',
  [ALERT_TYPES.OUTSIDE_HOURS]: 'خارج ساعات التشغيل',
} as const;

export const ALERT_SEVERITY = {
  INFO: 'info',
  WARNING: 'warning',
  CRITICAL: 'critical',
} as const;

export const ALERT_SEVERITY_COLORS = {
  [ALERT_SEVERITY.INFO]: '#3b82f6',
  [ALERT_SEVERITY.WARNING]: '#f59e0b',
  [ALERT_SEVERITY.CRITICAL]: '#ef4444',
} as const;
