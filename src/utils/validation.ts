import { z } from 'zod'

export const emailSchema = z.string().email('بريد إلكتروني غير صحيح')

export const passwordSchema = z
  .string()
  .min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل')

export const phoneSchema = z
  .string()
  .regex(/^(\+966|0)[0-9]{9}$/, 'رقم جوال غير صحيح')

export const postalCodeSchema = z
  .string()
  .regex(/^[0-9]{5}$/, 'الرمز البريدي يجب أن يكون 5 أرقام')

export const urlSchema = z.string().url('رابط غير صحيح')

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    displayName: z.string().min(3, 'الاسم يجب أن يكون 3 أحرف على الأقل'),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: 'يجب قبول الشروط والأحكام',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'كلمات المرور غير متطابقة',
    path: ['confirmPassword'],
  })

export const addressSchema = z.object({
  label: z.string().min(1, 'اسم العنوان مطلوب'),
  fullName: z.string().min(3, 'الاسم الكامل مطلوب'),
  phone: phoneSchema,
  street: z.string().min(3, 'الشارع مطلوب'),
  city: z.string().min(1, 'المدينة مطلوبة'),
  region: z.string().min(1, 'المنطقة مطلوب��'),
  postalCode: postalCodeSchema,
  country: z.string().default('السعودية'),
  isDefault: z.boolean().default(false),
})

export const productSchema = z.object({
  name: z.string().min(3, 'اسم المنتج مطلوب'),
  description: z.string().min(10, 'الوصف يجب أن يكون 10 أحرف على الأقل'),
  categoryId: z.string().min(1, 'التصنيف مطلوب'),
  price: z.number().min(0, 'السعر يجب أن يكون أكبر من 0'),
  originalPrice: z.number().optional(),
  stock: z.number().min(0, 'المخزون لا يمكن أن يكون سالب'),
  sku: z.string().min(1, 'SKU مطلوب'),
})

export const couponSchema = z.object({
  code: z.string().min(3, 'كود الكوبون مطلوب'),
  type: z.enum(['percentage', 'fixed']),
  value: z.number().min(0, 'القيمة يجب أن تكون أكبر من 0'),
  minOrderAmount: z.number().optional(),
})
