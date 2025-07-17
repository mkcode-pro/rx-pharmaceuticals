import Image from "next/image"
import Link from "next/link"
import { siteConfig } from "@/lib/constants"

const categoryData = [
  {
    title: "TPC",
    href: "/categoria/tpc",
    count: "3 produtos",
    image: "/images/oral.webp"
  },
  {
    title: "PERDA DE GORDURA",
    href: "/categoria/perda-gordura",
    count: "15 produtos",
    image: "/images/vial.webp"
  },
  {
    title: "ORAIS",
    href: "/categoria/orais",
    count: "18 produtos",
    image: "/images/oral.webp"
  },
  {
    title: "INJETÁVEIS",
    href: "/categoria/injetaveis",
    count: "15 produtos",
    image: "/images/vial.webp"
  }
]

export function ProductCategories() {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gray-50 w-full overflow-hidden">
      <div className="w-full max-w-screen-xl mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {categoryData.map((category, index) => (
            <Link
              key={index}
              href={category.href}
              className="group block w-full max-w-full"
            >
              <div className="relative overflow-hidden rounded-lg bg-black text-white transition-all duration-300 hover:scale-105 hover:shadow-xl w-full">
                {/* Background Image */}
                <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 w-full">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover opacity-30 transition-opacity group-hover:opacity-20"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 md:p-6">
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-1 sm:mb-2 group-hover:text-blue-400 transition-colors leading-tight">
                    {category.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300">
                    {category.count}
                  </p>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
