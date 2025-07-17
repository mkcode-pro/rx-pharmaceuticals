import { Users } from "lucide-react"

export function TeamSection() {
  const teamPlaceholders = [
    { name: "Atleta 1", role: "FORÇA" },
    { name: "Atleta 2", role: "DEFINIÇÃO" },
    { name: "Atleta 3", role: "MASSA" },
  ]

  return (
    <section className="bg-black py-8 sm:py-12 md:py-16 text-white relative overflow-hidden w-full">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="w-full max-w-screen-xl mx-auto px-3 sm:px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
            CONHEÇA O TIME RX PHARMACEUTICALS
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-2">
            O nosso time é composto por diversos tipos de pessoas, diversos tipos de mentalidades,
            diversos tipos de culturas, onde inclui desde influencers até atletas. Porém, todos eles
            possuem um único objetivo, elevar ao máximo o nível do seu físico, não sendo à toa, que
            todos eles escolheram fazer parte do time RX Pharmaceuticals!
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {teamPlaceholders.map((member, index) => (
            <div key={index} className="group text-center w-full max-w-full">
              {/* Placeholder for team member image */}
              <div className="relative mx-auto mb-4 sm:mb-6 w-full max-w-[280px] sm:max-w-[240px] md:max-w-[260px] h-64 sm:h-72 md:h-80 bg-gradient-to-b from-blue-900/50 to-blue-600/50 rounded-lg overflow-hidden border-2 border-blue-500/30">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Placeholder content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 sm:p-6">
                  <Users className="h-12 w-12 sm:h-16 sm:w-16 text-blue-400 mb-3 sm:mb-4 opacity-50" />
                  <div className="space-y-2">
                    <div className="h-3 sm:h-4 bg-white/20 rounded w-20 sm:w-24 mx-auto" />
                    <div className="h-2 sm:h-3 bg-white/10 rounded w-12 sm:w-16 mx-auto" />
                  </div>
                </div>

                {/* Role label */}
                <div className="absolute bottom-0 left-0 right-0 bg-blue-600 text-white p-2 sm:p-3">
                  <div className="text-sm sm:text-base md:text-lg font-bold transform -rotate-90 origin-center absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 whitespace-nowrap">
                    {member.role}
                  </div>
                  <div className="ml-6 sm:ml-8 text-center">
                    <div className="h-3 sm:h-4 bg-white/30 rounded w-16 sm:w-20 mx-auto mb-1 sm:mb-2" />
                    <div className="h-2 sm:h-3 bg-white/20 rounded w-12 sm:w-16 mx-auto" />
                  </div>
                </div>
              </div>

              {/* Member info placeholder */}
              <div className="space-y-2">
                <div className="h-5 sm:h-6 bg-white/10 rounded w-24 sm:w-32 mx-auto" />
                <div className="h-3 sm:h-4 bg-white/5 rounded w-20 sm:w-24 mx-auto" />
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-8 sm:mt-12">
          <p className="text-base sm:text-lg text-blue-200">
            Junte-se ao nosso time de sucesso!
          </p>
        </div>
      </div>
    </section>
  )
}
