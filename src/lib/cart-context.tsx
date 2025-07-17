"use client"

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import { useLocalStorage } from '@/hooks/use-local-storage'

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  slug: string
}

interface CartState {
  items: CartItem[]
  totalItems: number
  totalPrice: number
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartState }

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id)

      let newItems: CartItem[]
      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        newItems = [...state.items, { ...action.payload, quantity: 1 }]
      }

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

      return {
        items: newItems,
        totalItems,
        totalPrice,
      }
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload.id)
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

      return {
        items: newItems,
        totalItems,
        totalPrice,
      }
    }

    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: { id: action.payload.id } })
      }

      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      )

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

      return {
        items: newItems,
        totalItems,
        totalPrice,
      }
    }

    case 'CLEAR_CART':
      return initialState

    case 'LOAD_CART':
      return action.payload

    default:
      return state
  }
}

interface CartContextType {
  state: CartState
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const [, setCartStorage, isStorageLoading] = useLocalStorage('cart', initialState)

  // Save cart to localStorage when state changes (debounced)
  useEffect(() => {
    if (!isStorageLoading) {
      const timeoutId = setTimeout(() => {
        setCartStorage(state)
      }, 300)
      return () => clearTimeout(timeoutId)
    }
  }, [state, setCartStorage, isStorageLoading])

  const addItem = useCallback((item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }, [])

  const removeItem = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } })
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' })
  }, [])

  return (
    <CartContext.Provider value={{
      state,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
