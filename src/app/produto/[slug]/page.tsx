import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProductDetailPage } from "@/components/pages/product-detail-page"
import { siteConfig } from "@/lib/constants"

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = siteConfig.productsMock.find(p => p.slug === params.slug)

  if (!product) {
    return {
      title: "Produto não encontrado - RX Pharmaceuticals Brazil",
    }
  }

  return {
    title: `${product.name} - RX Pharmaceuticals Brazil`,
    description: product.fullDescription,
  }
}

export async function generateStaticParams() {
  return siteConfig.productsMock.map((product) => ({
    slug: product.slug,
  }))
}

export default function Page({ params }: PageProps) {
  const product = siteConfig.productsMock.find(p => p.slug === params.slug)

  if (!product) {
    notFound()
  }

  return <ProductDetailPage product={product} />
}
