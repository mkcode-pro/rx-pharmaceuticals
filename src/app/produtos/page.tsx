import type { Metadata } from "next"
import { ProductsPage } from "@/components/pages/products-page"

export const metadata: Metadata = {
  title: "Produtos - RX Pharmaceuticals Brazil",
  description: "Catálogo completo de produtos farmacêuticos de alta performance. Injetáveis, orais, combos e TPC.",
}

export default function Page() {
  return <ProductsPage />
}
