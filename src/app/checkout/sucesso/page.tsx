import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle, Package, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Pedido Confirmado - RX Pharmaceuticals Brazil",
  description: "Seu pedido foi realizado com sucesso!",
}

export default function Page() {
  return (
    <div className="w-full max-w-screen-xl mx-auto px-3 sm:px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Pedido Realizado com Sucesso!
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          Obrigado pela sua compra. Você receberá um e-mail de confirmação em breve com os detalhes do seu pedido.
        </p>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Próximos Passos</h2>

            <div className="space-y-4 text-left">
              <div className="flex items-start gap-3">
                <Package className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-medium">Preparação do Pedido</h3>
                  <p className="text-sm text-gray-600">
                    Seu pedido será preparado e despachado em até 2 dias úteis.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-medium">Acompanhamento</h3>
                  <p className="text-sm text-gray-600">
                    Você receberá o código de rastreamento via WhatsApp e e-mail.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/produtos">
              Continuar Comprando
            </Link>
          </Button>

          <Button variant="outline" size="lg" asChild>
            <Link href="/conta">
              Ver Meus Pedidos
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
