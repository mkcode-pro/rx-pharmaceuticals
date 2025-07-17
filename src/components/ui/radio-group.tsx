"use client"

import * as React from "react"

interface RadioGroupContextProps {
  value: string
  setValue: (v: string) => void
}

const RadioGroupContext = React.createContext<RadioGroupContextProps | null>(null)

export function RadioGroup({ value, onValueChange, children, className }: {
  value: string
  onValueChange: (v: string) => void
  children: React.ReactNode
  className?: string
}) {
  const setValue = (v: string) => onValueChange(v)
  return (
    <RadioGroupContext.Provider value={{ value, setValue }}>
      <div className={className}>{children}</div>
    </RadioGroupContext.Provider>
  )
}

export function RadioGroupItem({ value, id, children, className }: { value: string; id: string; children?: React.ReactNode; className?: string }) {
  const ctx = React.useContext(RadioGroupContext)!
  const checked = ctx.value === value
  return (
    <label htmlFor={id} className={`flex items-center gap-2 cursor-pointer ${className ?? ""}`}>
      <input
        type="radio"
        id={id}
        name="radio-group"
        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
        checked={checked}
        onChange={() => ctx.setValue(value)}
      />
      {children}
    </label>
  )
}
