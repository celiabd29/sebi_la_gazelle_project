import { useNavigate } from "react-router-dom";
import fond404 from "/src/assets/img/fonds/fond-404.webp";

const Page404 = () => {
  const navigate = useNavigate();

  const goToJeux = () => {
    navigate("/jeux");
  };

  return (
    <section
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat flex flex-col justify-end items-center pb-10"
      style={{ backgroundImage: `url(${fond404})` }}
    >
      <button
        onClick={goToJeux}
        className="w-64 bg-[#D1006F] hover:bg-[#B20060] text-white text-xl font-bold py-4 px-8 rounded-full shadow-md transition"
      >
        Jouer
      </button>
    </section>
  );
};

export default Page404;
