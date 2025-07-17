"use client"

import * as React from "react"
import { useState } from "react"
import Link from "next/link"
import { User, Package, MapPin, Settings, LogOut, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface Order {
  id: string
  date: string
  status: "pending" | "shipped" | "delivered" | "cancelled"
  total: number
  items: number
}

export function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "shipped": return "bg-blue-100 text-blue-800"
      case "delivered": return "bg-green-100 text-green-800"
      case "cancelled": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending": return "Pendente"
      case "shipped": return "Enviado"
      case "delivered": return "Entregue"
      case "cancelled": return "Cancelado"
      default: return "Desconhecido"
    }
  }

  // Mock orders data
  const orders: Order[] = [
    {
      id: "PED-001",
      date: "2024-01-15",
      status: "delivered",
      total: 195.00,
      items: 2
    },
    {
      id: "PED-002",
      date: "2024-01-20",
      status: "shipped",
      total: 345.00,
      items: 3
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock login/register
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      phone: "",
    })
  }

  if (!isLoggedIn) {
    return (
      <div className="w-full max-w-md mx-auto px-3 sm:px-4 py-12">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {isLogin ? "Entrar na Conta" : "Criar Conta"}
            </CardTitle>
            <p className="text-gray-600">
              {isLogin
                ? "Acesse sua conta para ver seus pedidos"
                : "Crie sua conta para acompanhar seus pedidos"
              }
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div>
                    <Label htmlFor="fullName">Nome Completo</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData(prev => ({...prev, fullName: e.target.value}))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
                      required
                    />
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({...prev, password: e.target.value}))}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {!isLogin && (
                <div>
                  <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({...prev, confirmPassword: e.target.value}))}
                    required
                  />
                </div>
              )}

              <Button type="submit" className="w-full" size="lg">
                {isLogin ? "Entrar" : "Criar Conta"}
              </Button>
            </form>

            <Separator className="my-6" />

            <div className="text-center">
              <p className="text-sm text-gray-600">
                {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}
              </p>
              <Button
                variant="link"
                onClick={() => setIsLogin(!isLogin)}
                className="p-0 h-auto"
              >
                {isLogin ? "Criar conta" : "Fazer login"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Minha Conta
          </h1>
          <p className="text-gray-600">
            Bem-vindo de volta, João Silva!
          </p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Sair
        </Button>
      </div>

      {/* Account Tabs */}
      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-4">
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            <span className="hidden sm:inline">Pedidos</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Perfil</span>
          </TabsTrigger>
          <TabsTrigger value="addresses" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span className="hidden sm:inline">Endereços</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Configurações</span>
          </TabsTrigger>
        </TabsList>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Meus Pedidos</CardTitle>
            </CardHeader>
            <CardContent>
              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">Pedido #{order.id}</h3>
                            <Badge className={getStatusColor(order.status)}>
                              {getStatusText(order.status)}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            {new Date(order.date).toLocaleDateString('pt-BR')} • {order.items} {order.items === 1 ? 'item' : 'itens'}
                          </p>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-bold text-lg">{formatPrice(order.total)}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Ver Detalhes
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Nenhum pedido encontrado
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Você ainda não fez nenhum pedido
                  </p>
                  <Button asChild>
                    <Link href="/produtos">Começar a Comprar</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="profileName">Nome Completo</Label>
                  <Input id="profileName" defaultValue="João Silva" />
                </div>
                <div>
                  <Label htmlFor="profileEmail">E-mail</Label>
                  <Input id="profileEmail" type="email" defaultValue="joao@email.com" />
                </div>
                <div>
                  <Label htmlFor="profilePhone">Telefone</Label>
                  <Input id="profilePhone" defaultValue="(11) 99999-9999" />
                </div>
                <div>
                  <Label htmlFor="profileBirth">Data de Nascimento</Label>
                  <Input id="profileBirth" type="date" />
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-4">Alterar Senha</h4>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="currentPassword">Senha Atual</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">Nova Senha</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="confirmNewPassword">Confirmar Nova Senha</Label>
                    <Input id="confirmNewPassword" type="password" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button>Salvar Alterações</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Addresses Tab */}
        <TabsContent value="addresses" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Meus Endereços</CardTitle>
              <Button>Adicionar Endereço</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Casa</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Rua das Flores, 123<br/>
                        Apto 45, Vila Nova<br/>
                        São Paulo - SP<br/>
                        CEP: 01234-567
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Editar</Button>
                      <Button variant="outline" size="sm">Remover</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações da Conta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-4">Notificações</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">E-mail de pedidos</p>
                      <p className="text-sm text-gray-600">Receber confirmações de pedidos por e-mail</p>
                    </div>
                    <Button variant="outline" size="sm">Ativado</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <p className="text-sm text-gray-600">Receber atualizações via WhatsApp</p>
                    </div>
                    <Button variant="outline" size="sm">Ativado</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Ofertas e promoções</p>
                      <p className="text-sm text-gray-600">Receber e-mails sobre ofertas especiais</p>
                    </div>
                    <Button variant="outline" size="sm">Desativado</Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-4">Privacidade</h4>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    Baixar meus dados
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-red-600 border-red-600 hover:bg-red-50">
                    Excluir conta
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
