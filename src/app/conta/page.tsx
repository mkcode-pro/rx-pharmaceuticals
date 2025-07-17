import type { Metadata } from "next"
import { AccountPage } from "@/components/pages/account-page"

export const metadata: Metadata = {
  title: "Minha Conta - RX Pharmaceuticals Brazil",
  description: "Gerencie sua conta, pedidos e informações pessoais.",
}

export default function Page() {
  return <AccountPage />
}
