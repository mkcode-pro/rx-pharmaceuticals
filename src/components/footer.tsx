import Image from "next/image"
import Link from "next/link"
import { Instagram, MessageCircle, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white w-full overflow-hidden">
      {/* Main Footer Content */}
      <div className="w-full max-w-screen-xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4 sm:mb-6">
              <Image
                src="https://ugc.same-assets.com/go6flhcvIk10FpiksFJtdzRbSYUwoUYt.png"
                alt="RX Pharmaceuticals Brazil"
                width={200}
                height={80}
                className="h-12 sm:h-16 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              Sua farmácia de produtos de alta performance.
              Oferecemos produtos de qualidade internacional com tecnologia aplicada
              para resultados garantidos.
            </p>

            {/* Social Media */}
            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-semibold text-base sm:text-lg">
                Siga nossas redes sociais para mais conteúdos e novidades
              </h4>
              <div className="flex space-x-3 sm:space-x-4">
                <Button size="icon" variant="outline" className="border-gray-700 hover:bg-blue-600 h-10 w-10 sm:h-11 sm:w-11">
                  <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <Button size="icon" variant="outline" className="border-gray-700 hover:bg-blue-600 h-10 w-10 sm:h-11 sm:w-11">
                  <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Links Rápidos</h4>
            <nav className="space-y-2">
              <Link href="/sobre-nos" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base">
                Sobre Nós
              </Link>
              <Link href="/faq" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base">
                Perguntas Frequentes
              </Link>
              <Link href="/blog" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base">
                Blog
              </Link>
              <Link href="/contato" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base">
                Contato
              </Link>
            </nav>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Categorias</h4>
            <nav className="space-y-2">
              <Link href="/categoria/injetaveis" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base">
                Injetáveis
              </Link>
              <Link href="/categoria/orais" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base">
                Orais
              </Link>
              <Link href="/categoria/combos" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base">
                Combos
              </Link>
              <Link href="/categoria/tpc" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base">
                TPC
              </Link>
            </nav>
          </div>
        </div>

        <Separator className="my-6 sm:my-8 bg-gray-700" />

        {/* Support Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-blue-400">
              Principais dúvidas
            </h4>
            <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
              Principais dúvidas de nossos clientes
            </p>

            <div className="space-y-3 sm:space-y-4">
              <div>
                <h5 className="font-medium text-white mb-2 text-sm sm:text-base">
                  Políticas de entrega:
                </h5>
                <p className="text-xs sm:text-sm text-gray-300">
                  Achamos inadmissível esperar vários dias para receber o rastreio de um pedido feito.
                  Na RX Pharmaceuticals o pedido é rastreado desde a postagem.
                </p>
              </div>

              <div>
                <h5 className="font-medium text-white mb-2 text-sm sm:text-base">
                  Extravio e Apreensões:
                </h5>
                <p className="text-xs sm:text-sm text-gray-300">
                  Se sua mercadoria for extraviada ou apreendida, garantimos o reenvio de 100%
                  da sua encomenda sem custo adicional.
                </p>
              </div>
            </div>

            <Link href="/faq" className="inline-block mt-3 sm:mt-4 text-blue-400 hover:underline text-sm">
              Para ver todas as perguntas de nossos clientes clique aqui
            </Link>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {/* Contact Buttons */}
            <div className="space-y-2 sm:space-y-3">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base min-h-[44px] sm:min-h-[48px]">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                SUPORTE AO CLIENTE
              </Button>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base min-h-[44px] sm:min-h-[48px]">
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                COMPRA NO WHATSAPP
              </Button>
            </div>

            {/* Contact Info */}
            <div className="text-xs sm:text-sm text-gray-300">
              <div className="flex items-center mb-2">
                <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                <span className="break-all">contato@rxpharmaceuticals.com.br</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="mb-4 sm:mb-6 bg-gray-700" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
            Copyright © 2011 - 2025 | RX Pharmaceuticals Brazil
          </p>

          {/* Security Badges */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="text-xs text-gray-400 text-center">
              SSL Seguro • Site Blindado
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
