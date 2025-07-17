"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface Toast {
  id: string
  title?: string
  description?: string
  type?: "success" | "error" | "warning" | "info"
  duration?: number
}

interface ToastContextType {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, "id">) => void
  removeToast: (id: string) => void
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const addToast = React.useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = { ...toast, id }
    
    setToasts(prev => [...prev, newToast])
    
    // Auto remove after duration
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, toast.duration || 5000)
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within ToastProvider")
  }
  return context
}

function ToastContainer({ toasts, removeToast }: { toasts: Toast[]; removeToast: (id: string) => void }) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  )
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const typeStyles = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    info: "bg-blue-50 border-blue-200 text-blue-800"
  }

  return (
    <div className={cn(
      "max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto border",
      typeStyles[toast.type || "info"]
    )}>
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-1">
            {toast.title && (
              <p className="text-sm font-medium">{toast.title}</p>
            )}
            {toast.description && (
              <p className="text-sm mt-1 opacity-90">{toast.description}</p>
            )}
          </div>
          <button
            onClick={() => onRemove(toast.id)}
            className="ml-4 flex-shrink-0 rounded-md p-1 hover:bg-black/5 focus:outline-none"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}