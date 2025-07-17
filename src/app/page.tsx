import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { FeaturedProducts } from "@/components/featured-products"
import { TeamSection } from "@/components/team-section"
import { ProductCategories } from "@/components/product-categories"
import { Newsletter } from "@/components/newsletter"

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <FeaturedProducts />
      <TeamSection />
      <ProductCategories />
      <Newsletter />
    </>
  );
}
