import { useState } from 'react';
import gsap from 'gsap';

function Game() {
  const [gameStarted, setGameStarted] = useState(false);
  const [firstCup, setFirstCup] = useState(null);
  const [ballPosition, setBallPosition] = useState({ left: 146, top: 256 });
  const [speed, setSpeed] = useState(0.5);
  const [objMovePattern, setObjMovePattern] = useState([]);
  const widthBall = 115; // Calculé à partir de la largeur de la balle
  const intMoves = 5; // Nombre de déplacements

  // Fonction pour initialiser les mouvements et les patterns
  const init = () => {
    const movePatterns = generateMovePatterns();
    setObjMovePattern(movePatterns);
  };

  // Fonction pour démarrer le jeu
  const startGame = () => {
    setGameStarted(true);
    const randomCup = Math.floor(Math.random() * 3) + 1;
    setFirstCup(randomCup);
    const cup = document.querySelector(`.cup-${randomCup}`);
    gsap.to(cup, { duration: 0.5, y: -130 });
    gsap.to(ballPosition, {
      duration: 0.5,
      left: cup.offsetLeft + widthBall,
      y: -30,
      onComplete: () => {
        setBallPosition({ left: cup.offsetLeft + widthBall, top: -30 });
        gsap.to(cup, { duration: 0.5, y: 0, onComplete: shakeCups });
      }
    });
  };

  // Fonction pour secouer les tasses
  const shakeCups = () => {
    setBallPosition({ left: -9999, top: -9999 }); // Cache la balle
    const positions = [
      document.querySelector(`.cup-${objMovePattern[0][0]}`).offsetLeft,
      document.querySelector(`.cup-${objMovePattern[0][1]}`).offsetLeft,
      document.querySelector(`.cup-${objMovePattern[0][2]}`).offsetLeft,
    ];

    objMovePattern.forEach((move, i) => {
      const delay = speed * i;
      setSpeed(speed > 0.2 ? speed / 1.1 : 0.2); // Augmenter la vitesse
      gsap.to(`.cup-${move[0]}`, {
        delay,
        left: positions[0],
        ease: 'sine.out',
      });
      gsap.to(`.cup-${move[1]}`, {
        delay,
        left: positions[1],
        ease: 'sine.out',
      });
      gsap.to(`.cup-${move[2]}`, {
        delay,
        left: positions[2],
        ease: 'sine.out',
        onComplete: () => {
          document.querySelectorAll('.cup').forEach((cup) => {
            cup.style.cursor = 'pointer';
            cup.addEventListener('click', clickCup);
          });
        }
      });
    });
  };

  // Fonction pour gérer le clic sur une tasse
  const clickCup = (event) => {
    const currentCup = event.currentTarget;
    currentCup.removeEventListener('click', clickCup);
    currentCup.style.cursor = 'default';
    const cupId = currentCup.id.split('cup')[1];
    setBallPosition({ left: document.querySelector(`.cup-${firstCup}`).offsetLeft + widthBall, top: 256 });
    gsap.to(`.cup-${cupId}`, {
      duration: 0.5,
      y: -130,
      ease: 'sine.in',
    });
  };

  // Générer les mouvements aléatoires des tasses
  const generateMovePatterns = () => {
    let moves = [[1, 2, 3]];
    for (let i = 0; i < intMoves; i++) {
      let pattern = [1, 2, 3];
      let shuffledPattern;
      do {
        shuffledPattern = shuffle(pattern);
      } while (shuffledPattern[0] === moves[i][0]);
      moves.push(shuffledPattern);
    }
    return moves;
  };

  // Fonction pour mélanger les éléments
  const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  };

  return (
    <div className="relative w-full bg-[#9cdee0] text-white text-center">
      {!gameStarted && (
        <button
          id="btnStart"
          onClick={startGame}
          className="py-2 px-6 bg-[#151f75] text-white font-bold rounded-lg"
        >
          START
        </button>
      )}
      <p className="font-lato font-bold text-2xl pt-8">Find the ball</p>
      <div className="relative w-[99%] h-[450px] mx-auto mt-12">
        <div className="absolute w-[788px] h-full mx-auto left-0 right-0">
          <div id="cup1" className="cup cup-1 bg-[#151f75] absolute top-[50px] w-[196px] h-[286px]"></div>
          <div id="cup2" className="cup cup-2 bg-[#151f75] absolute top-[50px] left-[296px] w-[196px] h-[286px]"></div>
          <div id="cup3" className="cup cup-3 bg-[#151f75] absolute top-[50px] left-[592px] w-[196px] h-[286px]"></div>
          <div
            id="ball"
            className="bg-white absolute w-[155px] h-[103px] left-[146px] top-[256px]"
            style={{
              left: ballPosition.left,
              top: ballPosition.top,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Game;
