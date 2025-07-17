"use client"

import * as React from "react"
import { siteConfig } from "@/lib/constants"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"

const tabs = [
  { id: "combos", label: "COMBOS" },
  { id: "destaque", label: "DESTAQUE" },
  { id: "mais-vendidos", label: "MAIS VENDIDOS" },
]

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = React.useState("combos")

  const getFilteredProducts = () => {
    switch (activeTab) {
      case "combos":
        return siteConfig.productsMock.filter(product => product.category === "Combos")
      case "destaque":
        return siteConfig.productsMock.filter(product => product.featured)
      case "mais-vendidos":
        return siteConfig.productsMock.filter(product => product.bestseller)
      default:
        return siteConfig.productsMock.slice(0, 4)
    }
  }

  const filteredProducts = getFilteredProducts()

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white w-full overflow-hidden">
      <div className="w-full max-w-screen-xl mx-auto px-3 sm:px-4">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">
            DESCONTOS E PROMOÇÕES
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-6 sm:mb-8 overflow-x-auto pb-2">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg min-w-fit">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 sm:px-6 py-2 font-medium transition-all text-xs sm:text-sm whitespace-nowrap min-h-[40px] sm:min-h-[44px] ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:grid-cols-3 xl:grid-cols-4 w-full max-w-full">
          {filteredProducts.map((product) => (
            <div key={product.id} className="w-full max-w-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <p className="text-gray-500 mb-4 text-sm sm:text-base">Nenhum produto encontrado nesta categoria.</p>
          </div>
        )}
      </div>
    </section>
  )
}
