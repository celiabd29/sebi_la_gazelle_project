import ContactForm from "../components/ContactForm";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/footer";
import HeroSectionContact from "../components/HeroSectionContact";

const Contact = () => {
  return (
    <div>
      <Header />
      <HeroSectionContact />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Contact;
