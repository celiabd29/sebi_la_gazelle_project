// import { useForm } from "react-hook-form";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ContactForm = () => {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();

  // const onSubmit = (data) => {
  //   console.log("Form Submitted:", data);
  // };
  // Ajoutez ici votre logique d'envoi (e.g., API call)

  return (
    <div>
      <div className="bg-[#FCE5C2] rounded-[40px] my-20 mx-14 py-16 px-4 md:px-0">
        <h2 className="text-center text-3xl md:text-4xl font-semibold font-fredoka text-black mb-10">
          CONTACT
        </h2>
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-auto p-8">
          <form className="flex flex-col gap-6">
            <div>
              <label htmlFor="nom" className="block mb-2 text-sm font-medium">
                Nom
              </label>
              <input
                type="text"
                id="nom"
                placeholder="Charlene Reed"
                className="w-full border border-gray-300 text-sm rounded-md p-3 bg-gray-50"
              />
            </div>
            <div>
              <label
                htmlFor="prenom"
                className="block mb-2 text-sm font-medium"
              >
                Prenom
              </label>
              <input
                type="text"
                id="prenom"
                placeholder="Charlene Reed"
                className="w-full border border-gray-300 text-sm rounded-md p-3 bg-gray-50"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="charlenereed@gmail.com"
                className="w-full border border-gray-300 text-sm rounded-md p-3 bg-gray-50"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                placeholder=""
                className="w-full border border-gray-300 text-sm rounded-md p-3 bg-gray-50"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-black text-white text-sm font-medium py-3 rounded-md"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
