import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CategoryPage } from "@/components/pages/category-page"
import { siteConfig } from "@/lib/constants"

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = siteConfig.productCategories.find(c => c.slug === params.slug)

  if (!category) {
    return {
      title: "Categoria não encontrada - RX Pharmaceuticals Brazil",
    }
  }

  return {
    title: `${category.title} - RX Pharmaceuticals Brazil`,
    description: `Produtos da categoria ${category.title}. Encontre os melhores produtos farmacêuticos de alta performance.`,
  }
}

export async function generateStaticParams() {
  return siteConfig.productCategories.map((category) => ({
    slug: category.slug,
  }))
}

export default function Page({ params }: PageProps) {
  const category = siteConfig.productCategories.find(c => c.slug === params.slug)

  if (!category) {
    notFound()
  }

  return <CategoryPage category={category} />
}
