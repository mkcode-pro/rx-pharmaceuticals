"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 w-full">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/20" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="w-full max-w-screen-xl relative mx-auto px-3 sm:px-4 py-8 sm:py-12 md:py-20 lg:py-32">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-16 items-center animate-in fade-in duration-1000">
          {/* Text Content */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8 text-white order-2 lg:order-1">
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight">
                Combos RX
                <span className="block text-blue-200">
                  Alta Performance em evidência!
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-blue-100 max-w-lg">
                Evolua com inteligência e consistência.
              </p>
            </div>

            <Button
              size="lg"
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-400 text-white font-semibold px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg group min-h-[44px] sm:min-h-[48px]"
            >
              COMEÇAR A EVOLUÇÃO
              <ArrowRight className="ml-2 h-4 md:h-5 w-4 md:w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Product Image */}
          <div className="relative px-2 sm:px-4 lg:px-0 max-h-[300px] sm:max-h-[400px] lg:max-h-none order-1 lg:order-2">
            <div className="relative z-10 w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-blue-600/30 rounded-2xl sm:rounded-3xl blur-2xl sm:blur-3xl transform rotate-6" />
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 border border-white/20 w-full max-w-full">
                <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                  <div className="space-y-2 sm:space-y-3 md:space-y-4">
                    <Image
                      src="/images/vial.webp"
                      alt="Produto Injetável"
                      width={120}
                      height={120}
                      className="w-full h-auto max-w-[60px] sm:max-w-[80px] md:max-w-[100px] lg:max-w-[120px] mx-auto object-contain"
                      loading="lazy"
                    />
                    <Image
                      src="/images/oral.webp"
                      alt="Produto Oral"
                      width={120}
                      height={120}
                      className="w-full h-auto max-w-[60px] sm:max-w-[80px] md:max-w-[100px] lg:max-w-[120px] mx-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="space-y-2 sm:space-y-3 md:space-y-4 pt-2 sm:pt-4 md:pt-8">
                    <Image
                      src="/images/vial.webp"
                      alt="Produto Injetável"
                      width={120}
                      height={120}
                      className="w-full h-auto max-w-[60px] sm:max-w-[80px] md:max-w-[100px] lg:max-w-[120px] mx-auto object-contain"
                      loading="lazy"
                    />
                    <Image
                      src="/images/oral.webp"
                      alt="Produto Oral"
                      width={120}
                      height={120}
                      className="w-full h-auto max-w-[60px] sm:max-w-[80px] md:max-w-[100px] lg:max-w-[120px] mx-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
