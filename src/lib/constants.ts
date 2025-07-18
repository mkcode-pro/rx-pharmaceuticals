export const siteConfig = {
  name: "RX Pharmaceuticals Brazil",
  description: "Sua farmácia de produtos de alta performance",
  url: "https://rxpharmaceuticals.com.br",
  mainNav: [
    {
      title: "Início",
      href: "/",
    },
    {
      title: "Produtos",
      href: "/produtos",
    },
    {
      title: "Sobre Nós",
      href: "/sobre",
    },
    {
      title: "Contato",
      href: "/contato",
    },
  ],
  productCategories: [
    {
      title: "Injetáveis",
      href: "/categoria/injetaveis",
      image: "/images/vial.webp",
      slug: "injetaveis"
    },
    {
      title: "Orais",
      href: "/categoria/orais",
      image: "/images/oral.webp",
      slug: "orais"
    },
    {
      title: "Ganho de Massa Magra",
      href: "/categoria/ganho-massa",
      image: "/images/vial.webp",
      slug: "ganho-massa"
    },
    {
      title: "Perda de Gordura",
      href: "/categoria/perda-gordura",
      image: "/images/oral.webp",
      slug: "perda-gordura"
    },
    {
      title: "Ganho de Força",
      href: "/categoria/ganho-forca",
      image: "/images/vial.webp",
      slug: "ganho-forca"
    },
    {
      title: "Combos",
      href: "/categoria/combos",
      image: "/images/oral.webp",
      slug: "combos"
    },
    {
      title: "TPC",
      href: "/categoria/tpc",
      image: "/images/oral.webp",
      slug: "tpc"
    },
  ],
  productsMock: [
    {
      id: "1",
      name: "Enantato de Testosterona 300mg 10ml",
      slug: "enantato-testosterona",
      price: 195.00,
      originalPrice: 205.00,
      discount: 5,
      category: "Injetáveis",
      categorySlug: "injetaveis",
      image: "/images/vial.webp",
      images: ["/images/vial.webp", "/images/vial.webp", "/images/vial.webp"],
      rating: 5,
      reviewCount: 127,
      bestseller: true,
      featured: true,
      inStock: true,
      stock: 45,
      description: "Ganho de Força, Ganho de Massa Magra, Injetáveis, Perda de Gordura",
      fullDescription: "O Enantato de Testosterona é um dos esteroides anabolizantes mais utilizados para ganho de massa muscular e força. Com concentração de 300mg por ml, este produto oferece resultados excepcionais para atletas que buscam performance máxima.",
      benefits: ["Ganho de massa muscular", "Aumento da força", "Melhora da performance", "Recuperação acelerada"],
      dosage: "300-600mg por semana",
      cycle: "8-12 semanas",
      tags: ["testosterona", "enantato", "massa", "força"]
    },
    {
      id: "2",
      name: "Acetato de Trembolona 100mg 10ml",
      slug: "acetato-trembolona",
      price: 180.00,
      originalPrice: 200.00,
      discount: 10,
      category: "Injetáveis",
      categorySlug: "injetaveis",
      image: "/images/vial.webp",
      images: ["/images/vial.webp", "/images/vial.webp"],
      rating: 5,
      reviewCount: 89,
      bestseller: false,
      featured: true,
      inStock: true,
      stock: 32,
      description: "Injetáveis, Definição Muscular, Força",
      fullDescription: "Acetato de Trembolona é conhecido por sua potência excepcional na definição muscular e ganho de força. Ideal para atletas em cutting ou recomposição corporal.",
      benefits: ["Definição muscular extrema", "Ganho de força", "Queima de gordura", "Qualidade muscular"],
      dosage: "100-300mg por semana",
      cycle: "6-8 semanas",
      tags: ["trembolona", "acetato", "definição", "cutting"]
    },
    {
      id: "3",
      name: "Durateston (Sustanon) 250mg 10ml",
      slug: "durateston",
      price: 195.00,
      originalPrice: 205.00,
      discount: 5,
      category: "Injetáveis",
      categorySlug: "injetaveis",
      image: "/images/vial.webp",
      images: ["/images/vial.webp", "/images/vial.webp"],
      rating: 4.85,
      reviewCount: 156,
      bestseller: false,
      featured: true,
      inStock: true,
      stock: 28,
      description: "Injetáveis, Mix de Testosteronas",
      fullDescription: "Durateston é uma mistura de quatro ésteres de testosterona que proporciona liberação sustentada e efeitos prolongados. Ideal para ganho de massa e força.",
      benefits: ["Liberação sustentada", "Ganho de massa", "Aumento da libido", "Melhora do humor"],
      dosage: "250-500mg por semana",
      cycle: "10-12 semanas",
      tags: ["durateston", "sustanon", "testosterona", "mix"]
    },
    {
      id: "4",
      name: "Masteron 100mg 10ml",
      slug: "masteron",
      price: 210.00,
      originalPrice: 230.00,
      discount: 9,
      category: "Injetáveis",
      categorySlug: "injetaveis",
      image: "/images/vial.webp",
      images: ["/images/vial.webp"],
      rating: 5,
      reviewCount: 73,
      bestseller: false,
      featured: true,
      inStock: true,
      stock: 19,
      description: "Ganho de Massa Magra, Injetáveis, Perda de Gordura",
      fullDescription: "Masteron é conhecido por seus efeitos de endurecimento muscular e redução de gordura corporal. Muito utilizado em preparações para competições.",
      benefits: ["Endurecimento muscular", "Redução de gordura", "Melhora vascular", "Definição"],
      dosage: "300-500mg por semana",
      cycle: "8-10 semanas",
      tags: ["masteron", "definição", "cutting", "hardening"]
    },
    {
      id: "5",
      name: "Primobolan Depot 100mg 10ml",
      slug: "primobolan-depot",
      price: 290.00,
      originalPrice: 310.00,
      discount: 6,
      category: "Injetáveis",
      categorySlug: "injetaveis",
      image: "/images/vial.webp",
      images: ["/images/vial.webp"],
      rating: 5,
      reviewCount: 94,
      bestseller: false,
      featured: false,
      inStock: true,
      stock: 15,
      description: "Ganho de Massa Magra, Injetáveis, Perda de Gordura",
      fullDescription: "Primobolan Depot é considerado um dos esteroides mais seguros e eficazes para ganho de massa muscular de qualidade com mínimos efeitos colaterais.",
      benefits: ["Massa muscular de qualidade", "Poucos efeitos colaterais", "Ideal para iniciantes", "Versatilidade"],
      dosage: "400-600mg por semana",
      cycle: "10-12 semanas",
      tags: ["primobolan", "depot", "seguro", "qualidade"]
    },
    {
      id: "6",
      name: "Oxandrolona 10mg 30 comprimidos",
      slug: "oxandrolona",
      price: 170.00,
      originalPrice: 180.00,
      discount: 5,
      category: "Orais",
      categorySlug: "orais",
      image: "/images/oral.webp",
      images: ["/images/oral.webp", "/images/oral.webp"],
      rating: 5,
      reviewCount: 203,
      bestseller: true,
      featured: true,
      inStock: true,
      stock: 67,
      description: "Orais, Perda de Gordura, Definição",
      fullDescription: "Oxandrolona é um esteroide oral suave, ideal para cutting e definição muscular. Muito popular entre atletas que buscam qualidade muscular sem retenção.",
      benefits: ["Definição muscular", "Perda de gordura", "Manutenção de massa", "Poucos efeitos colaterais"],
      dosage: "20-40mg por dia",
      cycle: "6-8 semanas",
      tags: ["oxandrolona", "oral", "cutting", "definição"]
    },
    {
      id: "7",
      name: "Combo Bronze (6 Produtos)",
      slug: "combo-bronze",
      price: 797.00,
      originalPrice: 850.00,
      discount: 6,
      category: "Combos",
      categorySlug: "combos",
      image: "/images/vial.webp",
      images: ["/images/vial.webp", "/images/oral.webp"],
      rating: 5,
      reviewCount: 45,
      bestseller: false,
      featured: true,
      inStock: true,
      stock: 8,
      description: "Combos para Iniciantes",
      fullDescription: "Combo Bronze é perfeito para iniciantes que desejam um ciclo completo e balanceado. Inclui produtos essenciais para ganho de massa e proteção.",
      benefits: ["Ciclo completo", "Economia", "Produtos complementares", "Ideal para iniciantes"],
      dosage: "Conforme orientação de cada produto",
      cycle: "8-10 semanas",
      tags: ["combo", "bronze", "iniciante", "ciclo"]
    },
    {
      id: "8",
      name: "Stanozolol 10mg 30 comprimidos",
      slug: "stanozolol",
      price: 145.00,
      originalPrice: 160.00,
      discount: 9,
      category: "Orais",
      categorySlug: "orais",
      image: "/images/oral.webp",
      images: ["/images/oral.webp"],
      rating: 4.8,
      reviewCount: 134,
      bestseller: true,
      featured: true,
      inStock: true,
      stock: 52,
      description: "Orais, Definição, Força",
      fullDescription: "Stanozolol é um dos esteroides mais populares para definição muscular e ganho de força sem retenção de líquidos.",
      benefits: ["Definição extrema", "Ganho de força", "Sem retenção", "Vascularização"],
      dosage: "20-30mg por dia",
      cycle: "6-8 semanas",
      tags: ["stanozolol", "winstrol", "definição", "força"]
    },
    {
      id: "9",
      name: "Clomid 50mg 30 comprimidos",
      slug: "clomid",
      price: 89.00,
      originalPrice: 95.00,
      discount: 6,
      category: "TPC",
      categorySlug: "tpc",
      image: "/images/oral.webp",
      images: ["/images/oral.webp"],
      rating: 4.9,
      reviewCount: 167,
      bestseller: true,
      featured: false,
      inStock: true,
      stock: 78,
      description: "TPC, Pós-Ciclo",
      fullDescription: "Clomid é essencial para a Terapia Pós-Ciclo (TPC), ajudando na recuperação natural da produção hormonal após o uso de esteroides.",
      benefits: ["Recuperação hormonal", "Manutenção dos ganhos", "Reduz efeitos colaterais", "Essencial na TPC"],
      dosage: "50-100mg por dia",
      cycle: "4-6 semanas",
      tags: ["clomid", "tpc", "recuperação", "pós-ciclo"]
    },
    {
      id: "10",
      name: "Combo Prata (8 Produtos)",
      slug: "combo-prata",
      price: 1247.00,
      originalPrice: 1350.00,
      discount: 8,
      category: "Combos",
      categorySlug: "combos",
      image: "/images/vial.webp",
      images: ["/images/vial.webp", "/images/oral.webp"],
      rating: 5,
      reviewCount: 32,
      bestseller: false,
      featured: true,
      inStock: true,
      stock: 5,
      description: "Combos Intermediário",
      fullDescription: "Combo Prata para usuários intermediários que buscam resultados mais avançados com produtos de alta qualidade e proteção completa.",
      benefits: ["Ciclo intermediário", "Máxima qualidade", "Proteção completa", "Resultados superiores"],
      dosage: "Conforme orientação de cada produto",
      cycle: "10-12 semanas",
      tags: ["combo", "prata", "intermediário", "avançado"]
    }
  ]
}

export type SiteConfig = typeof siteConfig
