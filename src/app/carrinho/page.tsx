import type { Metadata } from "next"
import { CartPage } from "@/components/pages/cart-page"

export const metadata: Metadata = {
  title: "Carrinho de Compras - RX Pharmaceuticals Brazil",
  description: "Revise seus produtos selecionados e finalize sua compra com segurança.",
}

export default function Page() {
  return <CartPage />
}
