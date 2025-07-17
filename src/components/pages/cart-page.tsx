"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Truck, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/lib/cart-context"

export function CartPage() {
  const { state, updateQuantity, removeItem, clearCart } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const shippingCost = state.totalPrice > 200 ? 0 : 25
  const finalTotal = state.totalPrice + shippingCost

  if (state.items.length === 0) {
    return (
      <div className="w-full max-w-screen-xl mx-auto px-3 sm:px-4 py-8">
        <div className="text-center py-12">
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Seu carrinho está vazio
          </h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Adicione produtos ao seu carrinho para continuar com a compra
          </p>
          <Button asChild size="lg">
            <Link href="/produtos">
              Continuar Comprando
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <Button variant="ghost" asChild className="mb-4 -ml-3">
          <Link href="/produtos">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continuar comprando
          </Link>
        </Button>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Carrinho de Compras
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          {state.totalItems} {state.totalItems === 1 ? 'item' : 'itens'} no seu carrinho
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {state.items.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/produto/${item.slug}`}
                      className="block font-medium text-gray-900 hover:text-blue-600 transition-colors mb-1"
                    >
                      <h3 className="line-clamp-2 text-sm sm:text-base">{item.name}</h3>
                    </Link>

                    <p className="text-lg sm:text-xl font-bold text-blue-600 mb-3">
                      {formatPrice(item.price)}
                    </p>

                    {/* Quantity and Remove */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border rounded-lg">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="px-3 py-1 text-sm min-w-[40px] text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="text-right flex-shrink-0">
                    <p className="text-lg sm:text-xl font-bold text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Clear Cart */}
          <div className="flex justify-end pt-4">
            <Button
              variant="outline"
              onClick={clearCart}
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Limpar Carrinho
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Resumo do Pedido
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({state.totalItems} itens)</span>
                  <span className="font-medium">{formatPrice(state.totalPrice)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Frete</span>
                  <span className="font-medium">
                    {shippingCost === 0 ? 'Grátis' : formatPrice(shippingCost)}
                  </span>
                </div>

                {state.totalPrice < 200 && (
                  <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
                    Frete grátis para compras acima de R$ 200,00
                  </div>
                )}

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-blue-600">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              <Button asChild className="w-full mt-6" size="lg">
                <Link href="/checkout">
                  Finalizar Compra
                </Link>
              </Button>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Truck className="h-4 w-4 text-blue-600" />
                  <span>Entrega em até 7 dias úteis</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span>Pagamento 100% seguro</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Precisa de ajuda?</p>
                <Button variant="outline" size="sm" className="w-full">
                  Falar no WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
