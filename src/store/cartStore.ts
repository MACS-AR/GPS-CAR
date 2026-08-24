import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem } from '@/types'

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: string, variantId?: string) => void
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
  getItemsBySeller: () => Record<string, CartItem[]>
}

export const useCartStore = create<CartStore>(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item: CartItem) => {
        const { items } = get()
        const existingItem = items.find(
          (i) =>
            i.productId === item.productId &&
            i.variantId === item.variantId &&
            i.sellerId === item.sellerId
        )

        if (existingItem) {
          set({
            items: items.map((i) =>
              i.productId === item.productId &&
              i.variantId === item.variantId &&
              i.sellerId === item.sellerId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          })
        } else {
          set({ items: [...items, item] })
        }
      },

      removeItem: (productId: string, variantId?: string) => {
        set({
          items: get().items.filter(
            (i) => !(i.productId === productId && i.variantId === variantId)
          ),
        })
      },

      updateQuantity: (productId: string, quantity: number, variantId?: string) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId)
          return
        }

        set({
          items: get().items.map((i) =>
            i.productId === productId && i.variantId === variantId
              ? { ...i, quantity }
              : i
          ),
        })
      },

      clearCart: () => {
        set({ items: [] })
      },

      getTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      },

      getItemsBySeller: () => {
        const items = get().items
        const grouped: Record<string, CartItem[]> = {}

        items.forEach((item) => {
          if (!grouped[item.sellerId]) {
            grouped[item.sellerId] = []
          }
          grouped[item.sellerId].push(item)
        })

        return grouped
      },
    }),
    {
      name: 'cart-store',
    }
  )
)
