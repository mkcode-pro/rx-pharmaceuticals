"use client"

import * as React from "react"

interface TabsContextProps {
  value: string
  setValue: (v: string) => void
}
const TabsContext = React.createContext<TabsContextProps | null>(null)

export function Tabs({ defaultValue, children, className }: { defaultValue: string; children: React.ReactNode; className?: string }) {
  const [value, setValue] = React.useState(defaultValue)
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex gap-2 ${className ?? ""}`}>{children}</div>
}

export function TabsTrigger({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  const ctx = React.useContext(TabsContext)!
  const active = ctx.value === value
  return (
    <button
      type="button"
      className={`px-4 py-2 text-sm rounded-md ${active ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"} ${className ?? ""}`}
      onClick={() => ctx.setValue(value)}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  const ctx = React.useContext(TabsContext)!
  if (ctx.value !== value) return null
  return <div className={className}>{children}</div>
}
