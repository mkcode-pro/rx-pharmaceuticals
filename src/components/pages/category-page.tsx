"use client"

import * as React from "react"
import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductCard } from "@/components/product-card"
import { siteConfig } from "@/lib/constants"

interface Category {
  title: string
  href: string
  image: string
  slug: string
}

interface CategoryPageProps {
  category: Category
}

export function CategoryPage({ category }: CategoryPageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [currentPage, setCurrentPage] = useState(1)

  const productsPerPage = 12

  // Filter products by category
  const categoryProducts = useMemo(() => {
    let filtered = siteConfig.productsMock.filter(product =>
      product.categorySlug === category.slug
    )

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "bestsellers":
          return (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0)
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [category.slug, searchTerm, sortBy])

  // Pagination
  const totalPages = Math.ceil(categoryProducts.length / productsPerPage)
  const paginatedProducts = categoryProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  )

  return (
    <div className="w-full max-w-screen-xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
        <Link href="/" className="hover:text-blue-600">Início</Link>
        <span>/</span>
        <Link href="/produtos" className="hover:text-blue-600">Produtos</Link>
        <span>/</span>
        <span className="text-gray-900">{category.title}</span>
      </nav>

      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-4 -ml-3">
        <Link href="/produtos">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Todos os produtos
        </Link>
      </Button>

      {/* Category Header */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-900 to-blue-600 text-white mb-8">
        <div className="absolute inset-0 opacity-20">
          <Image
            src={category.image}
            alt={category.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="relative p-6 sm:p-8 lg:p-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {category.title}
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl">
            Encontre os melhores produtos da categoria {category.title.toLowerCase()}
            para máxima performance e resultados excepcionais.
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder={`Buscar em ${category.title}...`}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="pl-10 h-11"
          />
        </div>

        {/* Sort */}
        <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
          <SelectTrigger className="w-full sm:w-[200px] h-11">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Nome A-Z</SelectItem>
            <SelectItem value="price-low">Menor Preço</SelectItem>
            <SelectItem value="price-high">Maior Preço</SelectItem>
            <SelectItem value="rating">Melhor Avaliado</SelectItem>
            <SelectItem value="bestsellers">Mais Vendidos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-gray-600">
          {categoryProducts.length} produto(s) encontrado(s) em {category.title}
        </p>
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchTerm("")
              setCurrentPage(1)
            }}
            className="text-blue-600"
          >
            Limpar busca
          </Button>
        )}
      </div>

      {/* Products Grid */}
      {paginatedProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Anterior
              </Button>

              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page =>
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  )
                  .map((page, index, array) => (
                    <React.Fragment key={page}>
                      {index > 0 && array[index - 1] !== page - 1 && (
                        <span className="px-2 py-1 text-gray-400">...</span>
                      )}
                      <Button
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="min-w-[40px]"
                      >
                        {page}
                      </Button>
                    </React.Fragment>
                  ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Próxima
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <SlidersHorizontal className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Nenhum produto encontrado
          </h3>
          <p className="text-gray-500 mb-6">
            {searchTerm
              ? `Não encontramos produtos que correspondam a "${searchTerm}" em ${category.title}`
              : `Ainda não temos produtos disponíveis em ${category.title}`
            }
          </p>
          {searchTerm ? (
            <Button onClick={() => {
              setSearchTerm("")
              setCurrentPage(1)
            }}>
              Ver todos os produtos de {category.title}
            </Button>
          ) : (
            <Button asChild>
              <Link href="/produtos">Ver todos os produtos</Link>
            </Button>
          )}
        </div>
      )}

      {/* Related Categories */}
      <div className="mt-12 pt-8 border-t">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Outras Categorias</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {siteConfig.productCategories
            .filter(cat => cat.slug !== category.slug)
            .slice(0, 6)
            .map((relatedCategory) => (
              <Link
                key={relatedCategory.slug}
                href={relatedCategory.href}
                className="group text-center"
              >
                <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2 group-hover:scale-105 transition-transform">
                  <Image
                    src={relatedCategory.image}
                    alt={relatedCategory.title}
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {relatedCategory.title}
                </h3>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}
