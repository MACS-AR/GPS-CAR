import dayjs from 'dayjs';
import 'dayjs/locale/ar';

export const formatDistance = (km: number, unit: 'km' | 'mi' = 'km'): string => {
  if (unit === 'mi') {
    return `${(km * 0.621371).toFixed(2)} mi`;
  }
  return `${km.toFixed(2)} km`;
};

export const formatSpeed = (speed: number, unit: 'km/h' | 'mph' = 'km/h'): string => {
  if (unit === 'mph') {
    return `${(speed * 0.621371).toFixed(1)} mph`;
  }
  return `${speed.toFixed(1)} km/h`;
};

export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}س ${minutes}د`;
  }
  if (minutes > 0) {
    return `${minutes}د ${secs}ث`;
  }
  return `${secs}ث`;
};

export const formatDateTime = (date: Date | string): string => {
  return dayjs(date).locale('ar').format('DD/MM/YYYY HH:mm');
};

export const formatDate = (date: Date | string): string => {
  return dayjs(date).locale('ar').format('DD/MM/YYYY');
};

export const formatTime = (date: Date | string): string => {
  return dayjs(date).locale('ar').format('HH:mm');
};

export const formatRelativeTime = (date: Date | string): string => {
  const now = dayjs();
  const target = dayjs(date);
  const diffSeconds = now.diff(target, 'second');

  if (diffSeconds < 60) return 'الآن';
  if (diffSeconds < 3600) return `منذ ${Math.floor(diffSeconds / 60)} د`;
  if (diffSeconds < 86400) return `منذ ${Math.floor(diffSeconds / 3600)} س`;
  if (diffSeconds < 604800) return `منذ ${Math.floor(diffSeconds / 86400)} أيام`;

  return formatDate(date);
};

export const formatBattery = (level: number): string => {
  if (level >= 75) return '🔋 ممتاز';
  if (level >= 50) return '🔋 جيد';
  if (level >= 25) return '🪫 منخفض';
  return '🪫 حرج';
};
