"use client"

import * as React from "react"

interface SelectContextProps {
  value: string
  setValue: (v: string) => void
  open: boolean
  setOpen: (o: boolean) => void
}

const SelectContext = React.createContext<SelectContextProps | null>(null)

export function Select({ value, onValueChange, children }: {
  value: string
  onValueChange: (v: string) => void
  children: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)
  const setValue = (v: string) => {
    onValueChange(v)
    setOpen(false)
  }
  return (
    <SelectContext.Provider value={{ value, setValue, open, setOpen }}>
      <div className="relative inline-block w-full">{children}</div>
    </SelectContext.Provider>
  )
}

export function SelectTrigger({ children, className, ...props }: React.HTMLAttributes<HTMLButtonElement>) {
  const ctx = React.useContext(SelectContext)!
  return (
    <button
      type="button"
      className={`flex items-center justify-between border rounded-md px-3 py-2 text-sm w-full bg-white ${className ?? ""}`}
      onClick={() => ctx.setOpen(!ctx.open)}
      {...props}
    >
      {children}
    </button>
  )
}

export function SelectValue({ placeholder }: { placeholder: string }) {
  const ctx = React.useContext(SelectContext)!
  const selected = placeholder || ctx.value
  return <span>{selected || placeholder}</span>
}

export function SelectContent({ children, className }: { children: React.ReactNode; className?: string }) {
  const ctx = React.useContext(SelectContext)!
  if (!ctx.open) return null
  return (
    <div className={`absolute z-50 mt-1 w-full bg-white border rounded-md shadow-lg ${className ?? ""}`}>
      {children}
    </div>
  )
}

export function SelectItem({ children, value, className }: { children: React.ReactNode; value: string; className?: string }) {
  const ctx = React.useContext(SelectContext)!
  return (
    <div
      className={`px-3 py-2 text-sm cursor-pointer hover:bg-blue-50 ${className ?? ""}`}
      onClick={() => ctx.setValue(value)}
    >
      {children}
    </div>
  )
}
