import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Shield, Award, Users, Truck, Phone, Mail, MessageCircle, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: "Segurança",
      description: "Garantimos a máxima segurança em todos os nossos produtos e processos de entrega."
    },
    {
      icon: Award,
      title: "Qualidade",
      description: "Produtos de qualidade internacional com tecnologia aplicada para resultados superiores."
    },
    {
      icon: Users,
      title: "Confiança",
      description: "Mais de 10 anos de experiência atendendo atletas e profissionais de alta performance."
    },
    {
      icon: Truck,
      title: "Entrega",
      description: "Sistema de entrega rápido e discreto, com rastreamento completo e seguro grátis."
    }
  ]

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative w-full max-w-screen-xl mx-auto px-3 sm:px-4 py-16 sm:py-20 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Sobre a RX Pharmaceuticals Brazil
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 leading-relaxed">
              Sua farmácia especializada em produtos de alta performance,
              oferecendo qualidade internacional e resultados garantidos.
            </p>
          </div>
        </div>
      </section>

      <div className="w-full max-w-screen-xl mx-auto px-3 sm:px-4">
        {/* Company Story */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Nossa História
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Fundada em 2011, a RX Pharmaceuticals Brazil nasceu da paixão por ajudar atletas
                  e entusiastas do fitness a alcançarem seus objetivos com máxima segurança e eficiência.
                </p>
                <p>
                  Durante mais de uma década, construímos uma reputação sólida baseada em qualidade,
                  confiabilidade e atendimento excepcional. Nossos produtos são cuidadosamente
                  selecionados e testados para garantir os mais altos padrões de qualidade.
                </p>
                <p>
                  Hoje, somos referência no mercado brasileiro, atendendo milhares de clientes
                  satisfeitos que confiam em nossos produtos para atingir seus objetivos de
                  performance e estética corporal.
                </p>
              </div>
            </div>

            <div className="relative h-64 sm:h-80 lg:h-96 bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src="/images/vial.webp"
                alt="Produtos RX Pharmaceuticals"
                fill
                className="object-contain p-8"
              />
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-12 sm:py-16 bg-gray-50 -mx-3 sm:-mx-4 px-3 sm:px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nossos Valores
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Os princípios que guiam nossa empresa e definem nossa excelência no atendimento
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <value.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-blue-600 mb-4">Nossa Missão</h3>
                <p className="text-gray-600 leading-relaxed">
                  Fornecer produtos farmacêuticos de alta performance com máxima qualidade
                  e segurança, ajudando nossos clientes a alcançarem seus objetivos de
                  forma responsável e eficiente, sempre com atendimento personalizado e
                  suporte técnico especializado.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-blue-600 mb-4">Nossa Visão</h3>
                <p className="text-gray-600 leading-relaxed">
                  Ser a empresa líder no Brasil em produtos farmacêuticos de alta performance,
                  reconhecida pela excelência em qualidade, inovação e atendimento,
                  contribuindo para o desenvolvimento do esporte e bem-estar de nossos clientes.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Differentials */}
        <section className="py-12 sm:py-16 bg-blue-50 -mx-3 sm:-mx-4 px-3 sm:px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Por que escolher a RX Pharmaceuticals?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="font-semibold text-lg text-gray-900 mb-3">
                🔬 Qualidade Internacional
              </h4>
              <p className="text-gray-600 text-sm">
                Produtos fabricados com matéria-prima de qualidade internacional
                e tecnologia de ponta para máxima eficácia.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="font-semibold text-lg text-gray-900 mb-3">
                📦 Entrega Segura
              </h4>
              <p className="text-gray-600 text-sm">
                Sistema de entrega discreto e seguro, com rastreamento completo
                e seguro grátis contra extravios.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="font-semibold text-lg text-gray-900 mb-3">
                🏆 Experiência Comprovada
              </h4>
              <p className="text-gray-600 text-sm">
                Mais de 10 anos no mercado atendendo atletas profissionais
                e entusiastas com excelência.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="font-semibold text-lg text-gray-900 mb-3">
                💬 Suporte Especializado
              </h4>
              <p className="text-gray-600 text-sm">
                Equipe técnica especializada para orientação sobre produtos
                e ciclos adequados para seus objetivos.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="font-semibold text-lg text-gray-900 mb-3">
                ✅ Garantia Total
              </h4>
              <p className="text-gray-600 text-sm">
                Reenvio garantido em caso de extravios ou apreensões,
                sem custo adicional para o cliente.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="font-semibold text-lg text-gray-900 mb-3">
                🔒 Pagamento Seguro
              </h4>
              <p className="text-gray-600 text-sm">
                Múltiplas formas de pagamento com máxima segurança
                e proteção de dados pessoais.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 sm:py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Entre em Contato
            </h2>
            <p className="text-lg text-gray-600">
              Nossa equipe está pronta para ajudar você
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <Phone className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Telefone</h4>
                <p className="text-sm text-gray-600">
                  Atendimento de segunda a sexta<br/>
                  das 9h às 18h
                </p>
                <Button className="mt-4 w-full">
                  Ligar Agora
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <h4 className="font-semibold mb-2">WhatsApp</h4>
                <p className="text-sm text-gray-600">
                  Atendimento rápido e<br/>
                  personalizado
                </p>
                <Button className="mt-4 w-full bg-green-600 hover:bg-green-700">
                  Chamar no WhatsApp
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Mail className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <h4 className="font-semibold mb-2">E-mail</h4>
                <p className="text-sm text-gray-600">
                  contato@rxpharmaceuticals.com.br<br/>
                  Resposta em até 24h
                </p>
                <Button variant="outline" className="mt-4 w-full">
                  Enviar E-mail
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Localização</h4>
                <p className="text-sm text-gray-600">
                  São Paulo - SP<br/>
                  Brasil
                </p>
                <Button variant="outline" className="mt-4 w-full">
                  Ver no Mapa
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 text-center">
          <div className="bg-blue-600 text-white rounded-2xl p-8 lg:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Pronto para Começar?
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Explore nosso catálogo completo de produtos de alta performance
              e encontre o que precisa para alcançar seus objetivos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Link href="/produtos">Ver Produtos</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                Falar com Especialista
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
