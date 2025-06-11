import ContactForm from "../components/ContactForm";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/footer";
import HeroSectionContact from "../components/HeroSectionContact";
import SEOHead from "../components/SEO/SEOHead";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();

  return (
    <div>
      <SEOHead
        title={t("contact") || "Contact"}
        description="Contactez l'équipe de Sebi la Gazelle. Nous sommes là pour répondre à vos questions sur nos jeux éducatifs pour enfants."
        keywords="contact, support, aide, questions, Sebi la gazelle"
        image="/og-contact.png"
      />
      <Header />
      <HeroSectionContact />
      <Footer />
    </div>
  );
};

export default Contact;
