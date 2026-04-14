import * as React from "react"
import { cn } from "../lib/utils"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-2xl border border-slate-200 bg-white text-slate-950 shadow-sm", className)} {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("font-semibold leading-none tracking-tight text-slate-800", className)} {...props} />
))
CardTitle.displayName = "CardTitle"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'secondary' }>(({ className, variant = 'default', ...props }, ref) => {
  const variants = {
    default: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
    outline: "border border-slate-300 bg-transparent hover:bg-slate-50 text-slate-700",
    ghost: "bg-transparent hover:bg-slate-100 text-slate-700",
    destructive: "bg-red-600 text-white hover:bg-red-700 shadow-sm",
  };
  return (
    <button
      ref={ref}
      className={cn("inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2", variants[variant], className)}
      {...props}
    />
  )
})
Button.displayName = "Button"

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn("flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 disabled:cursor-not-allowed disabled:opacity-50", className)}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(({ className, ...props }, ref) => (
  <label ref={ref} className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700", className)} {...props} />
))
Label.displayName = "Label"

const Badge = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'success' | 'warning' | 'destructive' }>(({ className, variant = 'default', ...props }, ref) => {
  const variants = {
    default: "bg-slate-100 text-slate-800",
    success: "bg-emerald-100 text-emerald-800",
    warning: "bg-amber-100 text-amber-800",
    destructive: "bg-red-100 text-red-800",
  };
  return (
    <div ref={ref} className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2", variants[variant], className)} {...props} />
  )
})
Badge.displayName = "Badge"

export { Card, CardHeader, CardTitle, CardContent, Button, Input, Label, Badge }
