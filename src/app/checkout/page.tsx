import type { Metadata } from "next"
import { CheckoutPage } from "@/components/pages/checkout-page"

export const metadata: Metadata = {
  title: "Finalizar Compra - RX Pharmaceuticals Brazil",
  description: "Complete sua compra de forma rápida e segura.",
}

export default function Page() {
  return <CheckoutPage />
}
