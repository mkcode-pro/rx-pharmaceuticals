"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ShoppingCart, Menu, Search, User, Heart, ChevronDown } from "lucide-react"
import { useCart } from "@/lib/cart-context"

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const pathname = usePathname()
  const { state } = useCart()

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-200",
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
          : "bg-white shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
      )}
    >
      <div className="w-full max-w-screen-xl mx-auto px-2 sm:px-4">
        <div className="flex h-16 md:h-[72px] items-center justify-between gap-1 sm:gap-2">
          {/* Mobile: Hamburger (left) */}
          <div className="flex md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-11 w-11 min-h-[44px] min-w-[44px] hover:bg-gray-100"
                >
                  <Menu className="h-6 w-6 stroke-[1.5]" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] p-0">
                <MobileNav onClose={() => setIsOpen(false)} pathname={pathname} />
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="https://ugc.same-assets.com/QR9cB0op8NqvOCQpz0kwRFG8hF1MQj87.png"
              alt="RX Pharmaceuticals Brazil"
              width={180}
              height={60}
              className="h-8 md:h-12 w-auto max-w-[100px] sm:max-w-[120px] md:max-w-[180px] object-contain mx-[6px] p-[0px]"
              priority
            />
          </Link>

          {/* Desktop navigation - centered */}
          <nav className="hidden md:flex items-center justify-center flex-1 px-8">
            <div className="flex items-center space-x-8">
              {siteConfig.mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative text-base font-medium text-gray-900 transition-colors duration-200 hover:text-[#0054B6] group",
                    pathname === item.href && "text-[#0054B6]"
                  )}
                >
                  {item.title}
                  <span className={cn(
                    "absolute -bottom-1 left-0 h-[2px] bg-[#0054B6] transition-all duration-200",
                    pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                  )} />
                </Link>
              ))}

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-1 text-base font-medium text-gray-900 transition-colors duration-200 hover:text-[#0054B6]">
                  <span>Categorias</span>
                  <ChevronDown className="h-4 w-4 stroke-[1.5]" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[240px]">
                  {siteConfig.productCategories.map((category) => (
                    <DropdownMenuItem key={category.href} asChild>
                      <Link
                        href={category.href}
                        className="text-sm font-medium text-gray-700 hover:text-[#0054B6]"
                      >
                        {category.title}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center">
            {/* Desktop actions */}
            <div className="hidden md:flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 hover:bg-gray-100"
              >
                <Search className="h-6 w-6 stroke-[1.5] text-gray-700" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 hover:bg-gray-100"
              >
                <Heart className="h-6 w-6 stroke-[1.5] text-gray-700" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 hover:bg-gray-100"
              >
                <User className="h-6 w-6 stroke-[1.5] text-gray-700" />
              </Button>
            </div>

            {/* Cart - visible on all screens */}
            <Link href="/carrinho">
              <Button
                variant="ghost"
                size="icon"
                className="relative h-11 w-11 min-h-[44px] min-w-[44px] hover:bg-gray-100"
              >
                <ShoppingCart className="h-6 w-6 stroke-[1.5] text-gray-700" />
                {state.totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#0054B6] text-[11px] font-semibold text-white flex items-center justify-center">
                    {state.totalItems}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

function MobileNav({ onClose, pathname }: { onClose: () => void; pathname: string }) {
  return (
    <div className="flex flex-col h-full">
      {/* Mobile Nav Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <Link href="/" onClick={onClose} className="flex items-center">
          <Image
            src="/images/logo.webp"
            alt="RX Pharmaceuticals"
            width={120}
            height={40}
            className="h-8 w-auto"
          />
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onClose}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Button>
      </div>

      {/* Mobile Nav Content */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {siteConfig.mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "block px-3 py-2 text-base font-medium rounded-md transition-colors",
                pathname === item.href
                  ? "bg-blue-50 text-[#0054B6]"
                  : "text-gray-900 hover:bg-gray-50"
              )}
            >
              {item.title}
            </Link>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t">
          <h4 className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Categorias
          </h4>
          <div className="space-y-1">
            {siteConfig.productCategories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                onClick={onClose}
                className="block px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-[#0054B6] transition-colors"
              >
                {category.title}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Nav Footer */}
      <div className="p-4 border-t">
        <div className="flex items-center justify-around">
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
