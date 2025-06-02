import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReturnButton from "../../components/button-return";
import SettingsButton from "../../components/button-settings";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateOperations(level) {
  let operators = ["+"];
  let max = 10;

  switch (level) {
    case 1:
      operators = ["+"];
      max = 10;
      break;
    case 2:
      operators = ["+", "-"];
      max = 20;
      break;
    case 3:
      operators = ["×"];
      max = 10;
      break;
    case 4:
      operators = ["÷"];
      max = 10;
      break;
    case 5:
      operators = ["+", "-", "×", "÷"];
      max = 20;
      break;
    default:
      operators = ["+"];
  }

  const operations = [];
  let attempts = 0;

  while (operations.length < 9 && attempts < 1000) {
    attempts++;
    const left = getRandomInt(1, max);
    const right = getRandomInt(1, max);
    const operator = operators[getRandomInt(0, operators.length - 1)];

    let answer;
    switch (operator) {
      case "+":
        answer = left + right;
        break;
      case "-":
        if (left < right) continue;
        answer = left - right;
        break;
      case "×":
        answer = left * right;
        break;
      case "÷":
        if (right === 0 || left % right !== 0 || left / right > 10) continue;
        answer = left / right;
        break;
      default:
        continue;
    }

    operations.push({ left, right, operator, answer });
  }

  return operations;
}

const GamePage = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const levelNumber = parseInt(level, 10) || 1;

  const [operations, setOperations] = useState([]);
  const [answers, setAnswers] = useState(Array(9).fill(""));
  const [score, setScore] = useState(null);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    setOperations(generateOperations(levelNumber));
    setAnswers(Array(9).fill(""));
    setValidated(false);
    setScore(null);
  }, [levelNumber]);

  const handleChange = (e, i) => {
    const updated = [...answers];
    updated[i] = e.target.value;
    setAnswers(updated);
  };

  const handleValidation = () => {
    let newScore = 0;
    answers.forEach((ans, index) => {
      if (parseInt(ans) === operations[index].answer) {
        newScore++;
      }
    });
    setScore(newScore);
    setValidated(true);

    const stars =
      newScore === 9 ? 3 : newScore >= 6 ? 2 : newScore >= 3 ? 1 : 0;
    const fail = stars < 2;

    navigate(
      `/jeuxJames/fin/${levelNumber}?score=${newScore}&stars=${stars}&fail=${fail}`
    );
  };

  if (operations.length === 0) return <p>{t("loading")}</p>;

  return (
    <div className="min-h-screen bg-sky-100 relative flex flex-col items-center justify-center p-4">
      <ReturnButton />
      <SettingsButton />

      <div className="flex flex-col items-center gap-2 mb-10 mt-[5rem] md:mt-4">
        <div className="border-2 border-blue-400 rounded-full px-4 py-1 text-xl font-bold text-blue-700">
          {t("level")} {levelNumber}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10 md:gap-14 mb-10 w-full px-2 max-w-5xl">
        {operations.map((op, i) => {
          const isCorrect = parseInt(answers[i]) === op.answer;
          return (
            <div
              key={i}
              className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white border-2 border-blue-400 rounded-lg flex items-center justify-center text-lg sm:text-xl font-bold">
                {op.left}
              </div>
              <div className="text-lg sm:text-xl font-bold">{op.operator}</div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white border-2 border-blue-400 rounded-lg flex items-center justify-center text-lg sm:text-xl font-bold">
                {op.right}
              </div>
              <div className="text-lg sm:text-xl font-bold">=</div>
              <input
                type="text"
                value={answers[i]}
                onChange={(e) => handleChange(e, i)}
                disabled={validated}
                className={`w-10 h-10 sm:w-12 sm:h-12 text-center border-2 rounded-lg text-lg sm:text-xl font-bold 
                  ${
                    validated
                      ? isCorrect
                        ? "border-green-500 bg-green-100"
                        : "border-red-500 bg-red-100"
                      : "border-blue-400"
                  }`}
              />
            </div>
          );
        })}
      </div>

      {!validated && (
        <button
          onClick={handleValidation}
          className="bg-green-500 text-white px-6 py-2 text-lg rounded-lg shadow hover:bg-green-600"
        >
          {t("validate")}
        </button>
      )}
    </div>
  );
};

export default GamePage;
