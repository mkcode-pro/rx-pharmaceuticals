"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Eye } from "lucide-react"
import { Star } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { analytics } from "@/lib/analytics"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface Product {
  id: string
  name: string
  slug: string
  price: number
  originalPrice?: number
  discount?: number
  category: string
  image: string
  rating: number
  bestseller?: boolean
  featured?: boolean
  description: string
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const [isAddingToCart, setIsAddingToCart] = React.useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    
    // Analytics tracking
    analytics.addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category
    })
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      slug: product.slug,
    })
    
    setIsAddingToCart(false)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 sm:h-4 sm:w-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <Card className="group relative overflow-hidden border transition-all duration-300 hover:shadow-lg md:hover:scale-105 hover:-translate-y-0 md:hover:-translate-y-1 w-full max-w-full">
      {/* Badges */}
      <div className="absolute top-1 left-1 md:top-2 md:left-2 z-10 flex flex-col gap-1 max-w-[calc(100%-2rem)]">
        {product.discount && (
          <Badge variant="destructive" className="bg-red-500 text-xs px-1 py-0 w-fit">
            -{product.discount}%
          </Badge>
        )}
        {product.bestseller && (
          <Badge className="bg-green-600 text-xs px-1 py-0 hidden sm:flex w-fit">
            Mais Vendido
          </Badge>
        )}
        {product.featured && (
          <Badge variant="outline" className="bg-blue-600 text-white border-blue-600 text-xs px-1 py-0 w-fit">
            OFERTA
          </Badge>
        )}
      </div>

      {/* Wishlist Button - Desktop Only */}
      <Button
        variant="ghost"
        size="icon"
        className="hidden md:flex absolute top-2 right-2 z-10 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm opacity-0 transition-all group-hover:opacity-100 items-center justify-center"
      >
        <Heart className="h-4 w-4" />
      </Button>

      <CardContent className="p-0 w-full">
        {/* Product Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-50 w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          />

          {/* Quick Actions Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center gap-2">
            <Button size="sm" variant="secondary" className="text-xs">
              <Eye className="h-3 w-3 mr-1" />
              Ver Detalhes
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-2 sm:p-3 md:p-4 space-y-1.5 sm:space-y-2 md:space-y-3 w-full max-w-full">
          {/* Category */}
          <div className="text-xs sm:text-sm text-blue-600 font-medium truncate">
            {product.category}
          </div>

          {/* Product Name */}
          <Link href={`/produto/${product.slug}`}>
            <h3 className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors leading-tight">
              {product.name}
            </h3>
          </Link>

          {/* Description - Hidden on mobile */}
          <p className="hidden sm:block text-xs md:text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>

          {/* Rating - Hidden on mobile */}
          <div className="hidden sm:flex items-center gap-1">
            {renderStars(Math.floor(product.rating))}
            <span className="text-xs md:text-sm text-gray-500 ml-1">
              ({product.rating})
            </span>
          </div>

          {/* Price */}
          <div className="space-y-0.5 w-full">
            {product.originalPrice && (
              <div className="text-xs text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </div>
            )}
            <div className="text-sm sm:text-base md:text-lg font-bold text-blue-600">
              {formatPrice(product.price)}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-1 sm:space-y-1.5 md:space-y-2 w-full">
            <Button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="w-full bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm py-2 sm:py-2.5 min-h-[40px] sm:min-h-[44px] font-medium"
              size="sm"
            >
              {isAddingToCart ? (
                <LoadingSpinner size="sm" />
              ) : (
                <>
                  <ShoppingCart className="h-3 sm:h-4 w-3 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                  <span className="hidden xs:inline sm:hidden">ADD</span>
                  <span className="hidden sm:inline lg:hidden">ADICIONAR</span>
                  <span className="hidden lg:inline">ADICIONAR AO</span>
                  <span className="xs:hidden sm:inline"> CARRINHO</span>
                </>
              )}
            </Button>

            <Button
              variant="outline"
              className="hidden sm:block w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-xs md:text-sm py-2 md:py-2.5 min-h-[40px] md:min-h-[44px]"
              size="sm"
            >
              SELECIONE AS OPÇÕES
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
