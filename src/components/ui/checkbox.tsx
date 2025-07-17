"use client"

import * as React from "react"

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ className, ...props }, ref) => (
  <input
    type="checkbox"
    ref={ref}
    className={`h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 ${className ?? ""}`}
    {...props}
  />
))
Checkbox.displayName = "Checkbox"
