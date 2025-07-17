"use client"

import * as React from "react"
import { useState, useMemo } from "react"
import { Search, Filter, SlidersHorizontal, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ProductCard } from "@/components/product-card"
import { siteConfig } from "@/lib/constants"

interface FilterState {
  categories: string[]
  priceRange: [number, number]
  inStock: boolean
  bestsellers: boolean
}

export function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 2000],
    inStock: false,
    bestsellers: false,
  })

  const productsPerPage = 12

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = siteConfig.productsMock.filter(product => {
      // Search filter
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !product.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false
      }

      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(product.categorySlug)) {
        return false
      }

      // Price range filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false
      }

      // In stock filter
      if (filters.inStock && !product.inStock) {
        return false
      }

      // Bestsellers filter
      if (filters.bestsellers && !product.bestseller) {
        return false
      }

      return true
    })

    // Remove duplicates using Map for better performance and reliability
    const uniqueProducts = Array.from(
      new Map(filtered.map(product => [product.id, product])).values()
    )

    // Sort products
    uniqueProducts.sort((a, b) => {
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

    return uniqueProducts
  }, [searchTerm, sortBy, filters])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage)
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  )

  const handleCategoryFilter = (category: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      categories: checked
        ? [...prev.categories, category]
        : prev.categories.filter(c => c !== category)
    }))
    setCurrentPage(1)
  }

  const handleSpecialFilter = (key: keyof Omit<FilterState, 'categories' | 'priceRange'>, checked: boolean) => {
    setFilters(prev => ({ ...prev, [key]: checked }))
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 2000],
      inStock: false,
      bestsellers: false,
    })
    setSearchTerm("")
    setCurrentPage(1)
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Todos os Produtos
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Encontre os melhores produtos farmacêuticos de alta performance
        </p>
      </div>

      {/* Search and Controls */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar produtos..."
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

        {/* Filter Button (Mobile) */}
        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="sm:hidden h-11">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px]">
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
            </SheetHeader>
            <div className="py-4">
              <FilterContent
                filters={filters}
                onCategoryFilter={handleCategoryFilter}
                onToggleSpecial={handleSpecialFilter}
                onClearFilters={clearFilters}
              />
            </div>
          </SheetContent>
        </Sheet>

        {/* View Mode */}
        <div className="hidden sm:flex border rounded-lg">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="rounded-r-none"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="rounded-l-none"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden sm:block w-64 flex-shrink-0">
          <div className="sticky top-20">
            <FilterContent
              filters={filters}
              onCategoryFilter={handleCategoryFilter}
              onToggleSpecial={handleSpecialFilter}
              onClearFilters={clearFilters}
            />
          </div>
        </aside>

        {/* Products Grid */}
        <main className="flex-1">
          {/* Results Count */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-600">
              {filteredAndSortedProducts.length} produto(s) encontrado(s)
            </p>
            {(filters.categories.length > 0 || filters.inStock || filters.bestsellers || searchTerm) && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-blue-600">
                Limpar filtros
              </Button>
            )}
          </div>

          {/* Products */}
          {paginatedProducts.length > 0 ? (
            <>
              <div className={`grid gap-3 sm:gap-4 ${
                viewMode === "grid"
                  ? "grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}>
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
              <p className="text-gray-500 mb-4">Nenhum produto encontrado com os filtros aplicados.</p>
              <Button onClick={clearFilters}>Limpar filtros</Button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

function FilterContent({
  filters,
  onCategoryFilter,
  onToggleSpecial,
  onClearFilters,
}: {
  filters: FilterState
  onCategoryFilter: (category: string, checked: boolean) => void
  onToggleSpecial: (key: 'inStock' | 'bestsellers', checked: boolean) => void
  onClearFilters: () => void
}) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Filtros</h3>
        <Button variant="ghost" size="sm" onClick={onClearFilters}>
          Limpar
        </Button>
      </div>

      <Separator />

      {/* Categories */}
      <div>
        <h4 className="font-medium text-base mb-3">Categorias</h4>
        <div className="space-y-2">
          {siteConfig.productCategories.map((category) => (
            <div key={category.slug} className="flex items-center space-x-2">
              <Checkbox
                id={category.slug}
                checked={filters.categories.includes(category.slug)}
                onCheckedChange={(checked) =>
                  onCategoryFilter(category.slug, checked as boolean)
                }
              />
              <Label htmlFor={category.slug} className="text-sm">
                {category.title}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Special Filters */}
      <div>
        <h4 className="font-medium text-base mb-3">Filtros Especiais</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="inStock"
              checked={filters.inStock}
              onCheckedChange={(checked) => onToggleSpecial('inStock', checked as boolean)}
            />
            <Label htmlFor="inStock" className="text-sm">
              Apenas em estoque
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="bestsellers"
              checked={filters.bestsellers}
              onCheckedChange={(checked) => onToggleSpecial('bestsellers', checked as boolean)}
            />
            <Label htmlFor="bestsellers" className="text-sm">
              Mais vendidos
            </Label>
          </div>
        </div>
      </div>
    </div>
  )
}
