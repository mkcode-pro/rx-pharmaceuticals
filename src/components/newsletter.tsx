"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = React.useState("")
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setEmail("")
      }, 3000)
    }
  }

  return (
    <section className="bg-blue-600 py-8 sm:py-12 md:py-16 w-full overflow-hidden">
      <div className="w-full max-w-screen-xl mx-auto px-3 sm:px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 leading-tight">
            Ganhe 5% desconto na sua primeira compra agora!
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-blue-100">
            Cadastre seu melhor e-mail e garante seu cupom!
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto w-full">
            <div className="flex-1 w-full">
              <Input
                type="email"
                placeholder="Digite seu e-mail aqui"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 sm:h-12 bg-white border-0 text-gray-900 placeholder:text-gray-500 w-full"
                required
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 sm:px-8 h-11 sm:h-12 w-full sm:w-auto min-h-[44px]"
              disabled={isSubmitted}
            >
              {isSubmitted ? (
                <>
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  ENVIADO!
                </>
              ) : (
                "ENVIAR AGORA"
              )}
            </Button>
          </form>

          {isSubmitted && (
            <div className="mt-4 p-3 sm:p-4 bg-green-600 rounded-lg mx-2 sm:mx-0">
              <p className="text-white font-medium text-sm sm:text-base">
                ✅ Obrigado! Seu cupom de desconto será enviado em breve.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
