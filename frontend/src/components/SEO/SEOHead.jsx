import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  image = "/logo-sebi.webp", 
  url,
  type = "website",
  children 
}) => {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'fr';
  
  const siteName = "Sebi la Gazelle";
  const defaultDescription = "Jeux éducatifs pour enfants de 4 à 8 ans. Apprendre en s'amusant avec Sebi la Gazelle et ses amis.";
  
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} - Jeux Éducatifs pour Enfants`;
  const metaDescription = description || defaultDescription;
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://sebilagazelle.fr');

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={lang === 'fr' ? 'fr_FR' : 'en_US'} />
      <meta property="og:site_name" content={siteName} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={image} />
      
      {children}
    </Helmet>
  );
};

export default SEOHead;
