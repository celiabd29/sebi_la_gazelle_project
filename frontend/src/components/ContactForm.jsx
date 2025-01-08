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
      <div className="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-fondjaune rounded-2xl shadow-xl">
        <div className="flex flex-row gap-3 pb-4">
          <h1 className="text-3xl font-bold text-[#4B5563] my-auto">Contact</h1>
        </div>
        <form className="flex flex-col">
          {/* onSubmit={handleSubmit(onSubmit)} */}
          <div className="pb-2">
            <label
              htmlFor="name"
              className="block mb-2 text-sm  text-[#111827]"
            >
              Nom
            </label>
            <div className="relative text-gray-400">
              <span className="absolute left-0 flex items-center p-1 pl-3">
                {/* icon de fontawsom */}
                <i className="fas fa-user"></i>
              </span>
              <input
                type="text"
                name="name"
                id="name"
                className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
                placeholder="Votre nom"
                // {...register("name", { required: "Name is required" })}
              />
              {/* {errors.name && ( */}
              {/* <p className="text-red-500 text-xs mt-1">{errors.name.message}</p> */}
              {/* )} */}
            </div>
          </div>
          <div className="pb-2">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-[#111827]"
            >
              Email
            </label>
            <div className="relative text-gray-400">
              <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                <i className="fa-regular fa-envelope"></i>
              </span>
              <input
                type="email"
                name="email"
                id="email"
                className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg block w-full p-2.5 rounded-l-lg py-3 px-4"
                placeholder="name@company.com"
                // {...register("email", {
                // required: "Email is required",
                // pattern: {
                // value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                // message: "Invalid email address",
                // },
                // })}
              />
              {/* {errors.email && ( */}
              {/* <p className="text-red-500 text-xs mt-1">{errors.email.message}</p> */}
              {/* )} */}
            </div>
          </div>
          {/* message */}
          <div className="pb-6">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-[#111827]"
            >
              Message
            </label>
            <div className="relative text-gray-400">
              <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                <i className="fa-regular fa-envelope"></i>
              </span>
              <textarea
                type="text"
                name="message"
                id="message"
                className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg  focus:ring-1 focus:outline-none block w-full p-2.5 rounded-l-lg py-3 px-4"
                placeholder="Votre message"
                // {...register("email", {
                // required: "Email is required",
                // pattern: {
                // value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                // message: "Invalid email address",
                // },
                // })}
              />
              {/* {errors.email && ( */}
              {/* <p className="text-red-500 text-xs mt-1">{errors.email.message}</p> */}
              {/* )} */}
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-[#fce5c2] bg-[#000000] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
