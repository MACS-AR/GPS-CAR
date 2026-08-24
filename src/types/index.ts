// User Types
export type UserRole = 'customer' | 'seller' | 'admin' | 'superAdmin' | 'support' | 'finance' | 'contentManager' | 'warehouseManager' | 'shippingManager'

export interface User {
  id: string
  email: string
  displayName: string
  photoURL?: string
  role: UserRole
  isActive: boolean
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
}

export interface UserProfile extends User {
  phone?: string
  dateOfBirth?: Date
  gender?: 'male' | 'female' | 'other'
  addresses: Address[]
  preferences?: UserPreferences
}

export interface UserPreferences {
  notifications: boolean
  newsletter: boolean
  language: 'ar' | 'en'
  currency: 'SAR' | 'USD' | 'EUR'
}

// Address Types
export interface Address {
  id: string
  userId: string
  label: string
  fullName: string
  phone: string
  street: string
  city: string
  region: string
  postalCode: string
  country: string
  isDefault: boolean
  createdAt: Date
  updatedAt: Date
}

// Category Types
export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  icon?: string
  parentId?: string
  sortOrder: number
  isActive: boolean
  isFeatured: boolean
  seoTitle?: string
  seoDescription?: string
  createdAt: Date
  updatedAt: Date
}

// Product Types
export type ProductStatus = 'pending' | 'approved' | 'rejected' | 'archived'

export interface ProductVariant {
  id: string
  sku: string
  name: string
  options: Record<string, string>
  price: number
  originalPrice?: number
  stock: number
  image?: string
  isActive: boolean
}

export interface Product {
  id: string
  sellerId: string
  name: string
  slug: string
  description: string
  categoryId: string
  price: number
  originalPrice?: number
  discount?: number
  images: string[]
  variants: ProductVariant[]
  stock: number
  sku: string
  rating: number
  reviewCount: number
  status: ProductStatus
  rejectionReason?: string
  isFeatured: boolean
  seoTitle?: string
  seoDescription?: string
  createdAt: Date
  updatedAt: Date
}

// Store Types
export type SellerStatus = 'pending' | 'approved' | 'rejected' | 'suspended'

export interface Store {
  id: string
  sellerId: string
  name: string
  slug: string
  description?: string
  logo?: string
  banner?: string
  status: SellerStatus
  rating: number
  reviewCount: number
  returnsPolicy?: string
  shippingPolicy?: string
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
}

// Cart Types
export interface CartItem {
  productId: string
  variantId?: string
  quantity: number
  price: number
  sellerId: string
}

export interface Cart {
  id: string
  userId: string
  items: CartItem[]
  createdAt: Date
  updatedAt: Date
}

// Order Types
export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'readyForShipping'
  | 'shipped'
  | 'outForDelivery'
  | 'delivered'
  | 'cancelled'
  | 'returnRequested'
  | 'returned'
  | 'refunded'

export interface OrderItem {
  productId: string
  variantId?: string
  sellerId: string
  name: string
  price: number
  quantity: number
  image?: string
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  subtotal: number
  discount: number
  tax: number
  shippingCost: number
  total: number
  status: OrderStatus
  paymentMethod: 'cashOnDelivery' | 'creditCard' | 'wallet'
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded'
  shippingAddressId: string
  couponCode?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface SellerOrder {
  id: string
  orderId: string
  sellerId: string
  buyerId: string
  items: OrderItem[]
  subtotal: number
  commission: number
  tax: number
  shippingCost: number
  total: number
  status: OrderStatus
  createdAt: Date
  updatedAt: Date
}

// Shipment Types
export type ShipmentStatus =
  | 'pending'
  | 'shipped'
  | 'outForDelivery'
  | 'delivered'
  | 'cancelled'
  | 'returned'

export interface Shipment {
  id: string
  orderId: string
  sellerOrderId: string
  buyerId: string
  sellerId: string
  carrier?: string
  trackingNumber?: string
  trackingUrl?: string
  status: ShipmentStatus
  origin?: string
  destination?: string
  estimatedDelivery?: Date
  shippedAt?: Date
  outForDeliveryAt?: Date
  deliveredAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface TrackingEvent {
  id: string
  shipmentId: string
  status: ShipmentStatus
  title: string
  description?: string
  location?: string
  timestamp: Date
  createdBy?: string
}

// Review Types
export interface Review {
  id: string
  productId: string
  orderId: string
  sellerId: string
  userId: string
  rating: number
  title?: string
  comment?: string
  images?: string[]
  helpful: number
  createdAt: Date
  updatedAt: Date
}

// Coupon Types
export type CouponType = 'percentage' | 'fixed'
export type CouponScope = 'general' | 'seller' | 'product' | 'category' | 'user'

export interface Coupon {
  id: string
  code: string
  type: CouponType
  value: number
  scope: CouponScope
  scopeId?: string
  minOrderAmount?: number
  maxDiscount?: number
  maxUsage?: number
  usageCount: number
  usedBy?: string[]
  validFrom: Date
  validUntil: Date
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// Promotion Types
export interface Promotion {
  id: string
  name: string
  description?: string
  type: 'discount' | 'flashSale' | 'seasonal'
  discount: number
  validFrom: Date
  validUntil: Date
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// Notification Types
export type NotificationType =
  | 'order'
  | 'payment'
  | 'shipment'
  | 'delivery'
  | 'cancellation'
  | 'return'
  | 'coupon'
  | 'promotion'
  | 'admin'
  | 'approval'
  | 'rejection'
  | 'seller_approval'

export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  data?: Record<string, any>
  isRead: boolean
  createdAt: Date
}

// Support Types
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed'

export interface SupportTicket {
  id: string
  userId: string
  subject: string
  description: string
  category: string
  status: TicketStatus
  priority: 'low' | 'medium' | 'high'
  attachments?: string[]
  responses?: TicketResponse[]
  createdAt: Date
  updatedAt: Date
}

export interface TicketResponse {
  id: string
  ticketId: string
  userId: string
  message: string
  attachments?: string[]
  createdAt: Date
}

// Wallet Types
export interface Wallet {
  id: string
  userId: string
  balance: number
  currency: string
  createdAt: Date
  updatedAt: Date
}

export interface WalletTransaction {
  id: string
  walletId: string
  type: 'credit' | 'debit'
  amount: number
  reason: string
  reference?: string
  createdAt: Date
}

// Finance Types
export interface SellerTransaction {
  id: string
  sellerId: string
  orderId: string
  grossAmount: number
  commission: number
  netAmount: number
  status: 'pending' | 'settled' | 'refunded'
  createdAt: Date
  updatedAt: Date
}

// Audit Log Types
export interface AuditLog {
  id: string
  actorId: string
  actorRole: UserRole
  action: string
  targetType: string
  targetId: string
  before?: Record<string, any>
  after?: Record<string, any>
  timestamp: Date
  ipHash?: string
}

// Settings Types
export interface SiteSettings {
  id: string
  siteName: string
  logo?: string
  currency: 'SAR' | 'USD' | 'EUR'
  timezone: string
  contactEmail: string
  contactPhone: string
  minOrderAmount: number
  commissionType: 'percentage' | 'fixed'
  commissionValue: number
  taxEnabled: boolean
  taxRate: number
  maintenanceMode: boolean
  requireProductApproval: boolean
  allowNewSellers: boolean
  updatedAt: Date
}
