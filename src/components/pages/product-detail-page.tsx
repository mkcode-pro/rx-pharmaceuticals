"use client"

import * as React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Heart, Share2, Star, Plus, Minus, ShoppingCart, Truck, Shield, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductCard } from "@/components/product-card"
import { siteConfig } from "@/lib/constants"
import { useCart } from "@/lib/cart-context"

interface Product {
  id: string
  name: string
  slug: string
  price: number
  originalPrice?: number
  discount?: number
  category: string
  categorySlug: string
  image: string
  images: string[]
  rating: number
  reviewCount: number
  bestseller?: boolean
  featured?: boolean
  inStock: boolean
  stock: number
  description: string
  fullDescription: string
  benefits: string[]
  dosage: string
  cycle: string
  tags: string[]
}

interface ProductDetailPageProps {
  product: Product
}

export function ProductDetailPage({ product }: ProductDetailPageProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ))
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        slug: product.slug,
      })
    }
  }

  // Get related products from same category
  const relatedProducts = siteConfig.productsMock
    .filter(p => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="w-full max-w-screen-xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4 sm:mb-6">
        <Link href="/" className="hover:text-blue-600">Início</Link>
        <span>/</span>
        <Link href="/produtos" className="hover:text-blue-600">Produtos</Link>
        <span>/</span>
        <Link href={`/categoria/${product.categorySlug}`} className="hover:text-blue-600">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-gray-900 truncate">{product.name}</span>
      </nav>

      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-4 -ml-3">
        <Link href="/produtos">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar aos produtos
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-8 sm:mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-contain"
              priority
            />
            {product.discount && (
              <div className="absolute top-4 left-4 z-10">
                <Badge variant="destructive" className="bg-red-500">
                  -{product.discount}% OFF
                </Badge>
              </div>
            )}
          </div>

          {/* Thumbnail Images */}
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-md overflow-hidden border-2 flex-shrink-0 ${
                    selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-4 sm:space-y-6">
          {/* Category */}
          <Link
            href={`/categoria/${product.categorySlug}`}
            className="text-blue-600 text-sm font-medium hover:underline"
          >
            {product.category}
          </Link>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {renderStars(Math.floor(product.rating))}
            </div>
            <span className="text-sm text-gray-600">
              {product.rating} ({product.reviewCount} avaliações)
            </span>
          </div>

          {/* Price */}
          <div className="space-y-1">
            {product.originalPrice && (
              <div className="text-lg text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </div>
            )}
            <div className="text-3xl sm:text-4xl font-bold text-blue-600">
              {formatPrice(product.price)}
            </div>
            {product.discount && (
              <div className="text-green-600 font-medium">
                Economia de {formatPrice(product.originalPrice! - product.price)}
              </div>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            {product.inStock ? (
              <>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-600 font-medium">
                  Em estoque ({product.stock} unidades)
                </span>
              </>
            ) : (
              <>
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-red-600 font-medium">Fora de estoque</span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            {product.fullDescription}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="font-medium">Quantidade:</span>
            <div className="flex items-center border rounded-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="h-10 w-10 p-0"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-4 py-2 min-w-[50px] text-center">{quantity}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="h-10 w-10 p-0"
                disabled={quantity >= product.stock}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6"
              size="lg"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Adicionar ao Carrinho - {formatPrice(product.price * quantity)}
            </Button>

            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="flex-1">
                <Heart className="h-4 w-4 mr-2" />
                Favoritar
              </Button>
              <Button variant="outline" className="flex-1">
                <Share2 className="h-4 w-4 mr-2" />
                Compartilhar
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t">
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-blue-600" />
              <div className="text-sm">
                <div className="font-medium">Entrega Rápida</div>
                <div className="text-gray-600">7 dias úteis</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-blue-600" />
              <div className="text-sm">
                <div className="font-medium">Seguro Grátis</div>
                <div className="text-gray-600">100% garantido</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="h-5 w-5 text-blue-600" />
              <div className="text-sm">
                <div className="font-medium">Reenvio</div>
                <div className="text-gray-600">Se necessário</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="details" className="mb-8 sm:mb-12">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="details">Detalhes</TabsTrigger>
          <TabsTrigger value="benefits">Benefícios</TabsTrigger>
          <TabsTrigger value="usage">Como Usar</TabsTrigger>
          <TabsTrigger value="reviews">Avaliações ({product.reviewCount})</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6 space-y-4">
          <h3 className="text-xl font-semibold">Descrição Completa</h3>
          <p className="text-gray-600 leading-relaxed">{product.fullDescription}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div>
              <h4 className="font-medium mb-2">Categoria</h4>
              <p className="text-gray-600">{product.category}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Estoque</h4>
              <p className="text-gray-600">{product.stock} unidades disponíveis</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="benefits" className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Principais Benefícios</h3>
          <ul className="space-y-2">
            {product.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-600">{benefit}</span>
              </li>
            ))}
          </ul>
        </TabsContent>

        <TabsContent value="usage" className="mt-6 space-y-4">
          <h3 className="text-xl font-semibold">Modo de Uso</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2 text-blue-600">Dosagem Recomendada</h4>
              <p className="text-gray-600">{product.dosage}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-blue-600">Duração do Ciclo</h4>
              <p className="text-gray-600">{product.cycle}</p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-800 mb-2">⚠️ Importante</h4>
            <p className="text-yellow-700 text-sm">
              Consulte sempre um profissional de saúde antes do uso. Este produto destina-se apenas a adultos saudáveis.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Avaliações dos Clientes</h3>

          <div className="space-y-4">
            {/* Reviews would come from a real API in production */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">{renderStars(5)}</div>
                <span className="font-medium">João Silva</span>
                <span className="text-sm text-gray-500">há 2 semanas</span>
              </div>
              <p className="text-gray-600">
                Produto excelente, chegou rápido e bem embalado. Resultados visíveis já nas primeiras semanas.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">{renderStars(5)}</div>
                <span className="font-medium">Maria Santos</span>
                <span className="text-sm text-gray-500">há 1 mês</span>
              </div>
              <p className="text-gray-600">
                Qualidade impecável! Recomendo para quem busca produtos de alta performance.
              </p>
            </div>

            <Button variant="outline" className="w-full">
              Ver todas as avaliações
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Produtos Relacionados</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
