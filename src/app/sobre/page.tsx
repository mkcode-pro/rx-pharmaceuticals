import type { Metadata } from "next"
import { AboutPage } from "@/components/pages/about-page"

export const metadata: Metadata = {
  title: "Sobre Nós - RX Pharmaceuticals Brazil",
  description: "Conheça a RX Pharmaceuticals Brazil, sua farmácia de produtos de alta performance. Nossa missão, visão e valores.",
}

export default function Page() {
  return <AboutPage />
}
