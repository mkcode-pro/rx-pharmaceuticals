import { Shield, Award, Truck } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Envio Seguro",
    description: "Despachamos seu pedido em até 7 dias úteis. O mais seguro do mercado!"
  },
  {
    icon: Award,
    title: "Qualidade",
    description: "Qualidade internacional de matéria prima com o mais moderno em tecnologia aplicada."
  },
  {
    icon: Truck,
    title: "Entrega Garantida",
    description: "Receba o acompanhamento do rastreio da sua encomenda direto no seu whatsapp e seguro grátis!"
  }
]

export function Features() {
  return (
    <section className="bg-gray-50 py-8 sm:py-12 md:py-16 w-full overflow-hidden">
      <div className="w-full max-w-screen-xl mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group text-center transition-all duration-300 hover:scale-105 p-3 sm:p-4 w-full max-w-full"
            >
              <div className="mx-auto mb-4 sm:mb-6 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-blue-100 transition-colors group-hover:bg-blue-600">
                <feature.icon className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600 transition-colors group-hover:text-white" />
              </div>
              <h3 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed px-2">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
