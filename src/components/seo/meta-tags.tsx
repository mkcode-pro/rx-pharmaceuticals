import Head from 'next/head'

interface MetaTagsProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: 'website' | 'product' | 'article'
  price?: number
  currency?: string
  availability?: 'in stock' | 'out of stock'
}

export function MetaTags({
  title = "RX Pharmaceuticals Brazil - Produtos de Alta Performance",
  description = "Sua farmácia de produtos de alta performance. Qualidade internacional com tecnologia aplicada para resultados garantidos.",
  keywords = "farmácia, produtos de performance, suplementos, injetáveis, orais, combos",
  image = "/images/logo.webp",
  url = "https://rxpharmaceuticals.com.br",
  type = "website",
  price,
  currency = "BRL",
  availability = "in stock"
}: MetaTagsProps) {
  const fullTitle = title.includes("RX Pharmaceuticals") ? title : `${title} - RX Pharmaceuticals Brazil`
  
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="RX Pharmaceuticals Brazil" />
      <meta property="og:locale" content="pt_BR" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Product specific meta tags */}
      {type === 'product' && price && (
        <>
          <meta property="product:price:amount" content={price.toString()} />
          <meta property="product:price:currency" content={currency} />
          <meta property="product:availability" content={availability} />
        </>
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </Head>
  )
}