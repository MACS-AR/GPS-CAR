export const APP_NAME = 'بتوع كل حاجة'
export const DEFAULT_CURRENCY = 'SAR'
export const DEFAULT_TIMEZONE = 'Asia/Riyadh'
export const DEFAULT_LANGUAGE = 'ar'

export const ROLES = {
  CUSTOMER: 'customer' as const,
  SELLER: 'seller' as const,
  ADMIN: 'admin' as const,
  SUPER_ADMIN: 'superAdmin' as const,
  SUPPORT: 'support' as const,
  FINANCE: 'finance' as const,
  CONTENT_MANAGER: 'contentManager' as const,
  WAREHOUSE_MANAGER: 'warehouseManager' as const,
  SHIPPING_MANAGER: 'shippingManager' as const,
}

export const ORDER_STATUSES = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  READY_FOR_SHIPPING: 'readyForShipping',
  SHIPPED: 'shipped',
  OUT_FOR_DELIVERY: 'outForDelivery',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  RETURN_REQUESTED: 'returnRequested',
  RETURNED: 'returned',
  REFUNDED: 'refunded',
}

export const SHIPMENT_STATUSES = {
  PENDING: 'pending',
  SHIPPED: 'shipped',
  OUT_FOR_DELIVERY: 'outForDelivery',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  RETURNED: 'returned',
}

export const PRODUCT_STATUSES = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  ARCHIVED: 'archived',
}

export const SELLER_STATUSES = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  SUSPENDED: 'suspended',
}

export const PAYMENT_METHODS = {
  CASH_ON_DELIVERY: 'cashOnDelivery',
  CREDIT_CARD: 'creditCard',
  WALLET: 'wallet',
}

export const NOTIFICATION_TYPES = {
  ORDER: 'order',
  PAYMENT: 'payment',
  SHIPMENT: 'shipment',
  DELIVERY: 'delivery',
  CANCELLATION: 'cancellation',
  RETURN: 'return',
  COUPON: 'coupon',
  PROMOTION: 'promotion',
  ADMIN: 'admin',
  APPROVAL: 'approval',
  REJECTION: 'rejection',
  SELLER_APPROVAL: 'seller_approval',
}

export const SAUDI_CITIES = [
  'الرياض',
  'جدة',
  'مكة المكرمة',
  'المدينة المنورة',
  'الدمام',
  'الخبر',
  'الظهران',
  'القطيف',
  'الجبيل',
  'الإحساء',
  'حائل',
  'أبها',
  'خميس مشيط',
  'جيزان',
  'عسير',
  'الطائف',
  'نجران',
  'تبوك',
  'ينبع',
  'الباحة',
]

export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/product/:slug',
  CATEGORY: '/category/:slug',
  SEARCH: '/search',
  STORE: '/store/:storeId',
  TRACK: '/track',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDER_SUCCESS: '/order-success',
  ORDERS: '/orders',
  ORDER_DETAIL: '/orders/:id',
  ORDER_TRACKING: '/orders/:id/tracking',
  FAVORITES: '/favorites',
  COMPARE: '/compare',
  PROFILE: '/profile',
  ADDRESSES: '/addresses',
  NOTIFICATIONS: '/notifications',
  BECOME_SELLER: '/become-seller',
  SELLER_DASHBOARD: '/seller',
  SELLER_PRODUCTS: '/seller/products',
  SELLER_ADD_PRODUCT: '/seller/products/new',
  SELLER_ORDERS: '/seller/orders',
  SELLER_SHIPMENTS: '/seller/shipments',
  ADMIN_DASHBOARD: '/admin',
  ADMIN_USERS: '/admin/users',
  ADMIN_SELLERS: '/admin/sellers',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_CATEGORIES: '/admin/categories',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_SHIPPING: '/admin/shipping',
}
