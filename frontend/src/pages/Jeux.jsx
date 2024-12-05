import Explication from "../components/explication";
import SectionJeux from "../components/SectionJeux";

const Jeux = () => {
    return (
        <div>
            <SectionJeux afficherDesc = {false} />
            <Explication />
        </div>
    );
}

export default Jeux;
