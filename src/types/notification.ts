export type NotificationType =
  | 'alert'
  | 'trip_started'
  | 'trip_ended'
  | 'subscription_warning'
  | 'subscription_expired'
  | 'new_feature';

export interface Notification {
  id: string;
  tenantId: string;
  userId?: string; // optional, if personal
  type: NotificationType;
  title: string;
  body: string;
  data?: Record<string, any>;
  read: boolean;
  readAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificationPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  alertNotifications: boolean;
  tripNotifications: boolean;
  subscriptionNotifications: boolean;
}
