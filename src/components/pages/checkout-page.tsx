"use client"

import * as React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Check, CreditCard, MapPin, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { useCart } from "@/lib/cart-context"
import { useRouter } from "next/navigation"

type CheckoutStep = "shipping" | "payment" | "review"

interface ShippingData {
  email: string
  fullName: string
  phone: string
  zipCode: string
  address: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
}

interface PaymentData {
  method: "credit" | "debit" | "pix" | "boleto"
  cardNumber?: string
  cardName?: string
  cardExpiry?: string
  cardCvv?: string
}

export function CheckoutPage() {
  const { state, clearCart } = useCart()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping")
  const [shippingData, setShippingData] = useState<ShippingData>({
    email: "",
    fullName: "",
    phone: "",
    zipCode: "",
    address: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  })
  const [paymentData, setPaymentData] = useState<PaymentData>({
    method: "credit",
  })
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const shippingCost = state.totalPrice > 200 ? 0 : 25
  const finalTotal = state.totalPrice + shippingCost

  // Redirect if cart is empty
  if (state.items.length === 0) {
    return (
      <div className="w-full max-w-screen-xl mx-auto px-3 sm:px-4 py-8">
        <div className="text-center py-12">
          <Package className="h-24 w-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Carrinho vazio
          </h1>
          <p className="text-gray-600 mb-8">
            Adicione produtos ao carrinho para finalizar a compra
          </p>
          <Button asChild size="lg">
            <Link href="/produtos">Ver Produtos</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleNext = () => {
    if (currentStep === "shipping") {
      setCurrentStep("payment")
    } else if (currentStep === "payment") {
      setCurrentStep("review")
    }
  }

  const handleBack = () => {
    if (currentStep === "payment") {
      setCurrentStep("shipping")
    } else if (currentStep === "review") {
      setCurrentStep("payment")
    }
  }

  const handleFinishOrder = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Clear cart and redirect to success page
    clearCart()
    router.push("/checkout/sucesso")
  }

  const steps = [
    { id: "shipping", title: "Entrega", icon: MapPin },
    { id: "payment", title: "Pagamento", icon: CreditCard },
    { id: "review", title: "Revisão", icon: Check },
  ]

  return (
    <div className="w-full max-w-screen-xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <Button variant="ghost" asChild className="mb-4 -ml-3">
          <Link href="/carrinho">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao carrinho
          </Link>
        </Button>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Finalizar Compra
        </h1>
      </div>

      {/* Steps Indicator */}
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep
          const isCompleted = steps.findIndex(s => s.id === currentStep) > index
          const StepIcon = step.icon

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isCompleted ? 'bg-green-500 text-white' :
                  isActive ? 'bg-blue-600 text-white' :
                  'bg-gray-200 text-gray-400'
                }`}>
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <StepIcon className="h-5 w-5" />
                  )}
                </div>
                <span className={`text-xs mt-1 ${
                  isActive ? 'text-blue-600 font-medium' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-px mx-4 ${
                  isCompleted ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {currentStep === "shipping" && (
            <Card>
              <CardHeader>
                <CardTitle>Informações de Entrega</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={shippingData.email}
                      onChange={(e) => setShippingData(prev => ({...prev, email: e.target.value}))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="fullName">Nome Completo *</Label>
                    <Input
                      id="fullName"
                      value={shippingData.fullName}
                      onChange={(e) => setShippingData(prev => ({...prev, fullName: e.target.value}))}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input
                      id="phone"
                      value={shippingData.phone}
                      onChange={(e) => setShippingData(prev => ({...prev, phone: e.target.value}))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">CEP *</Label>
                    <Input
                      id="zipCode"
                      value={shippingData.zipCode}
                      onChange={(e) => setShippingData(prev => ({...prev, zipCode: e.target.value}))}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Endereço *</Label>
                  <Input
                    id="address"
                    value={shippingData.address}
                    onChange={(e) => setShippingData(prev => ({...prev, address: e.target.value}))}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="number">Número *</Label>
                    <Input
                      id="number"
                      value={shippingData.number}
                      onChange={(e) => setShippingData(prev => ({...prev, number: e.target.value}))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="complement">Complemento</Label>
                    <Input
                      id="complement"
                      value={shippingData.complement}
                      onChange={(e) => setShippingData(prev => ({...prev, complement: e.target.value}))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="neighborhood">Bairro *</Label>
                    <Input
                      id="neighborhood"
                      value={shippingData.neighborhood}
                      onChange={(e) => setShippingData(prev => ({...prev, neighborhood: e.target.value}))}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">Cidade *</Label>
                    <Input
                      id="city"
                      value={shippingData.city}
                      onChange={(e) => setShippingData(prev => ({...prev, city: e.target.value}))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">Estado *</Label>
                    <Input
                      id="state"
                      value={shippingData.state}
                      onChange={(e) => setShippingData(prev => ({...prev, state: e.target.value}))}
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleNext} disabled={!shippingData.email || !shippingData.fullName}>
                    Continuar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === "payment" && (
            <Card>
              <CardHeader>
                <CardTitle>Forma de Pagamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup value={paymentData.method} onValueChange={(value) =>
                  setPaymentData(prev => ({...prev, method: value as any}))
                }>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="credit" id="credit" />
                      <Label htmlFor="credit" className="flex-1">
                        <div className="font-medium">Cartão de Crédito</div>
                        <div className="text-sm text-gray-500">Parcelamento em até 12x</div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="pix" id="pix" />
                      <Label htmlFor="pix" className="flex-1">
                        <div className="font-medium">PIX</div>
                        <div className="text-sm text-gray-500">Aprovação imediata</div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="boleto" id="boleto" />
                      <Label htmlFor="boleto" className="flex-1">
                        <div className="font-medium">Boleto Bancário</div>
                        <div className="text-sm text-gray-500">Vencimento em 3 dias úteis</div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>

                {paymentData.method === "credit" && (
                  <div className="space-y-4 pt-4 border-t">
                    <h4 className="font-medium">Dados do Cartão</h4>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="cardNumber">Número do Cartão</Label>
                        <Input
                          id="cardNumber"
                          placeholder="0000 0000 0000 0000"
                          value={paymentData.cardNumber}
                          onChange={(e) => setPaymentData(prev => ({...prev, cardNumber: e.target.value}))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardName">Nome no Cartão</Label>
                        <Input
                          id="cardName"
                          value={paymentData.cardName}
                          onChange={(e) => setPaymentData(prev => ({...prev, cardName: e.target.value}))}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cardExpiry">Validade</Label>
                          <Input
                            id="cardExpiry"
                            placeholder="MM/AA"
                            value={paymentData.cardExpiry}
                            onChange={(e) => setPaymentData(prev => ({...prev, cardExpiry: e.target.value}))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardCvv">CVV</Label>
                          <Input
                            id="cardCvv"
                            placeholder="000"
                            value={paymentData.cardCvv}
                            onChange={(e) => setPaymentData(prev => ({...prev, cardCvv: e.target.value}))}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={handleBack}>
                    Voltar
                  </Button>
                  <Button onClick={handleNext}>
                    Continuar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === "review" && (
            <Card>
              <CardHeader>
                <CardTitle>Revisar Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Shipping Info */}
                <div>
                  <h4 className="font-medium mb-2">Endereço de Entrega</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>{shippingData.fullName}</p>
                    <p>{shippingData.address}, {shippingData.number}</p>
                    {shippingData.complement && <p>{shippingData.complement}</p>}
                    <p>{shippingData.neighborhood}, {shippingData.city} - {shippingData.state}</p>
                    <p>CEP: {shippingData.zipCode}</p>
                  </div>
                </div>

                <Separator />

                {/* Payment Info */}
                <div>
                  <h4 className="font-medium mb-2">Forma de Pagamento</h4>
                  <p className="text-sm text-gray-600">
                    {paymentData.method === "credit" && "Cartão de Crédito"}
                    {paymentData.method === "pix" && "PIX"}
                    {paymentData.method === "boleto" && "Boleto Bancário"}
                  </p>
                </div>

                <Separator />

                {/* Terms */}
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    Concordo com os{" "}
                    <Link href="/termos" className="text-blue-600 hover:underline">
                      termos de uso
                    </Link>{" "}
                    e{" "}
                    <Link href="/privacidade" className="text-blue-600 hover:underline">
                      política de privacidade
                    </Link>
                  </Label>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={handleBack}>
                    Voltar
                  </Button>
                  <Button
                    onClick={handleFinishOrder}
                    disabled={!acceptTerms || isSubmitting}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isSubmitting ? "Processando..." : "Finalizar Pedido"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Items */}
              <div className="space-y-3">
                {state.items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-12 h-12 bg-gray-50 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                      <p className="text-xs text-gray-500">Qtd: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatPrice(state.totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Frete</span>
                  <span>{shippingCost === 0 ? 'Grátis' : formatPrice(shippingCost)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-blue-600">{formatPrice(finalTotal)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
