// Analytics and tracking utilities

export interface AnalyticsEvent {
  name: string
  properties?: Record<string, any>
}

export const analytics = {
  track: (event: AnalyticsEvent) => {
    if (typeof window !== 'undefined') {
      // Google Analytics 4
      if (window.gtag) {
        window.gtag('event', event.name, event.properties)
      }
      
      // Facebook Pixel
      if (window.fbq) {
        window.fbq('track', event.name, event.properties)
      }
      
      // Console log for development
      if (process.env.NODE_ENV === 'development') {
        console.log('Analytics Event:', event)
      }
    }
  },

  // E-commerce specific events
  addToCart: (product: { id: string; name: string; price: number; category: string }) => {
    analytics.track({
      name: 'add_to_cart',
      properties: {
        currency: 'BRL',
        value: product.price,
        items: [{
          item_id: product.id,
          item_name: product.name,
          item_category: product.category,
          price: product.price,
          quantity: 1
        }]
      }
    })
  },

  purchase: (orderId: string, items: any[], total: number) => {
    analytics.track({
      name: 'purchase',
      properties: {
        transaction_id: orderId,
        value: total,
        currency: 'BRL',
        items
      }
    })
  },

  viewProduct: (product: { id: string; name: string; category: string; price: number }) => {
    analytics.track({
      name: 'view_item',
      properties: {
        currency: 'BRL',
        value: product.price,
        items: [{
          item_id: product.id,
          item_name: product.name,
          item_category: product.category,
          price: product.price
        }]
      }
    })
  }
}

// Type declarations for global analytics
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    fbq?: (...args: any[]) => void
  }
}