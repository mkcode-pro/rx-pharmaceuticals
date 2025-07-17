"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCart } from "@/lib/cart-context"

const ICONS = {
  home: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
      <path d="M4 10.5 12 4l8 6.5M4 10.5V19a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8.5M4 10.5l8-6.5 8 6.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.5 22v-4.5a1.5 1.5 0 0 1 3 0V22" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    </svg>
  ),
  categorias: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
      <rect x="4" y="4" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.75"/>
      <rect x="13" y="4" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.75"/>
      <rect x="4" y="13" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.75"/>
      <rect x="13" y="13" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.75"/>
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.75"/>
      <path d="M21 21l-3.87-3.87" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    </svg>
  ),
  cart: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
      <path d="M6 22c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1Zm12 0c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1Z" fill="currentColor"/>
      <path d="M2 2h2.112c.45 0 .851.304.964.74L6.66 7.33m0 0A2 2 0 0 0 8.58 9h7.978a2 2 0 0 0 1.92-1.67l1.079-6.46A1 1 0 0 0 18.489.5H5.51c-.464 0-.877.32-.96.77L4.112 2H2Zm4.659 4.33L4.112 2m2.547 4.33L6.66 7.33ZM6.66 7.33l1.92 9.643a2 2 0 0 0 1.96 1.528h6.986a2 2 0 0 0 1.961-1.528l1.918-9.643M7.409 20.001H16.59" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round"/>
    </svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.75"/>
      <path d="M2 21c.22-3.77 4.07-6 10-6s9.78 2.23 10 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    </svg>
  )
}

const NAV = [
  {
    key: "home",
    label: "Início",
    href: "/",
    icon: ICONS.home
  },
  {
    key: "categorias",
    label: "Categorias",
    href: "/produtos",
    icon: ICONS.categorias
  },
  {
    key: "search",
    label: "Buscar",
    href: "/produtos",
    icon: ICONS.search
  },
  {
    key: "cart",
    label: "Carrinho",
    href: "/carrinho",
    icon: ICONS.cart
  },
  {
    key: "user",
    label: "Conta",
    href: "/conta",
    icon: ICONS.user
  },
]

export function MobileBottomNav() {
  const { state } = useCart()
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden h-16 w-full max-w-[100vw]">
      <nav className="flex justify-between items-center h-full mx-auto max-w-screen-md">
        {NAV.map((item) => {
          const active = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex-1 group relative flex flex-col items-center justify-center h-full"
              aria-current={active ? "page" : undefined}
            >
              <span
                className={`inline-flex items-center justify-center transition-colors duration-200 rounded-full ${active ? "bg-blue-50 text-[#0054B6]" : "text-gray-500 group-hover:text-[#0054B6]"} h-10 w-10 mt-1 mb-0.5`}
              >
                {item.icon}
                {item.key === "cart" && state.totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#0054B6] text-white text-[11px] font-bold rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center border-2 border-white animate-bounce-fast">
                    {state.totalItems}
                  </span>
                )}
              </span>
              <span
                className={`text-[11px] font-medium leading-none ${active ? "text-[#0054B6]" : "text-gray-600"}`}
              >{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
