import React, { useEffect, useRef, useState } from "react";
// useBrain;
const QUESTIONS = [
  {
    question: "2*(4+4) sonucu nedir?",
    answers: ["2", "4", "8", "16"],
    correct: 3,
  },
  {
    question: "9*9 sonucu nedir?",
    answers: ["18", "81", "80", "79"],
    correct: 1,
  },
  {
    question: "Formula 1'in 2022 şampiyonu kimdir?",
    answers: [
      "Max Verstappen",
      "Charles Leclerd",
      "Lewis Hamilton",
      "Lando Norris",
    ],
    correct: 0,
  },
  {
    question: "Formula 1 takviminde ilk sırada hangi grand prix vardır?",
    answers: [
      "Bahreyn Grand Prix",
      "Suudi Arabistan Grand Prix",
      "Avustralya Grand Prix",
      "Emilia Romagna Grand Prix",
    ],
    correct: 0,
  },
  {
    question: "Hangisi Formula 1 takımlarından değildir?",
    answers: [
      "Ford-AMG F1 Team",
      "Alfa Romeo F1 Team Orlen",
      "BWT Alpine F1 Team",
      "Oracle Red Bull Racing",
    ],
    correct: 0,
  },
];

function App() {
  const [questions, setQuestions] = useState(QUESTIONS);
  const [current, setCurrent] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [resultsShown, setResultsShown] = useState(false);
  function handleAnswer(e) {
    setCurrentAnswer(e.target.value);
  }
  // function handleOpenModal() {
  //   setIsOpen(true);
  // }
  function handleCloseModal() {
    setIsOpen(false);
  }

  function handleNext() {
    // If there's no answer you really shouldn't be clicking that button
    if (!currentAnswer && !questions[current].userAnswer) return;
    if (questions.every((question) => question.userAnswer) && !resultsShown) {
      setIsOpen(true);
      setResultsShown(true);
    } else {
      // Update le question in question (lol) with the user answer and check if it's correct
      if (!questions[current].hasOwnProperty("userAnswer")) {
        setQuestions(
          (prev) => {
            const updatedQuestion = {
              ...prev[current],
              userAnswer: currentAnswer,
              userCorrect:
                prev[current].answers[prev[current].correct] === currentAnswer,
            };
            return prev.map((question, index) =>
              index === current ? updatedQuestion : question
            );
          }

          // Multi-function button that first shows whether the user is correct and when clicked again moves on to the next question, fun
        );
      }
      if (questions[current].hasOwnProperty("userAnswer")) {
        setCurrent((prev) => {
          if (prev + 1 < questions.length) {
            return prev + 1;
          } else {
            return 0;
          }
        });
        setCurrentAnswer("");
      }
    }
  }

  function handleBack() {
    setCurrent((prev) => {
      if (prev - 1 >= 0 && questions[prev - 1].hasOwnProperty("userAnswer")) {
        return prev - 1;
      } else if (
        prev - 1 <= 0 &&
        questions[questions.length - 1].hasOwnProperty("userAnswer")
      ) {
        return questions.length - 1;
      } else {
        return prev;
      }
    });
  }

  return (
    <>
      <Quiz
        questions={questions}
        current={current}
        handleNext={handleNext}
        handleAnswer={handleAnswer}
        handleBack={handleBack}
        // handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        isOpen={isOpen}
        currentAnswer={currentAnswer}
      />
      <a
        href="https://www.freepik.com/free-ai-image/beautiful-mountains-landscape_133374413.htm#fromView=keyword&page=1&position=1&uuid=d11e3396-ca3d-4f98-b2dd-42a75294f679&from_element=home_trends"
        className="text-white absolute bottom-2 left-2 text-sm"
      >
        Image by freepik
      </a>
    </>
  );
}
const Quiz = ({
  questions,
  current,
  handleNext,
  currentAnswer,
  handleAnswer,
  handleBack,
  isOpen,
  handleCloseModal,
}) => {
  return (
    <div className="relative rounded-2xl bg-gradient-to-b from-[#6b36486c] to-[#e1a0382a]  backdrop-blur-sm p-4  w-5/6 sm:w-1/2 lg:w-2/5 min-[1500px]:w-1/3 h-1/2 grid grid-rows-[auto_1fr_auto] grid-cols 1 gap-4 shadow-[0_0_150px_3px_rgb(0,0,0,1)] border-[1px] border-[rgba(255,255,255,0.5)] text-white">
      <p className="w-full text-center font-bold text-2xl mt-4">
        {questions[current].question}
      </p>
      <div className="grid grid-cols-2 gap-4  place-items-center">
        {questions[current].answers.map((answer, index) => (
          <div key={answer} className="flex gap-4">
            <input
              id={`${current}${index}`}
              type="radio"
              value={answer}
              name={`${current}-answers`}
              onChange={handleAnswer}
              checked={
                currentAnswer === answer ||
                questions[current].userAnswer === answer
              }
              disabled={questions[current].hasOwnProperty("userAnswer")}
            />
            <label htmlFor={`${current}${index}`}>{answer}</label>
          </div>
        ))}
      </div>
      {/* Correct/Incorrect Display */}

      {/* <p
        className={`${
          questions[current].userCorrect === undefined
            ? "invisible"
            : questions[current].userCorrect
            ? "text-green-600"
            : "text-red-600"
        } bg-[#ffeec1] rounded-lg px-2 py-1 shadow-[0_0_6px_2px_rgb(0,0,0,0.4)_inset] text-center relative`}
      >
        {questions[current].userCorrect ? "Doğru" : "Yanlış"}
      </p> */}
      <p
        className={`${
          questions[current].userCorrect === undefined
            ? "invisible"
            : questions[current].userCorrect
            ? " text-white"
            : " text-white"
        } bg-[#c27f7d] px-2 py-1 shadow-[0_0_6px_2px_rgb(0,0,0,0.4)_inset] text-center relative rounded-lg font-semibold`}
      >
        {questions[current].userCorrect ? "Doğru" : "Yanlış"}
      </p>

      {/* {questions[current].userCorrect !== undefined && (
        <p
          className={`${
            questions[current].userCorrect ? "text-green-600" : "text-red-600"
          } bg-[#ffeec1] rounded-lg px-2 py-1 shadow-[0_0_6px_2px_rgb(0,0,0,0.4)_inset] text-center relative`}
        >
          {questions[current].userCorrect ? "Doğru" : "Yanlış"}
        </p>
      )} */}
      {/* Forward Button */}
      <div className="flex justify-between">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="button-create px-2 py-1 bg-[#b8615f] hover:bg-[#d18c2a] active:scale-x-110 active:scale-y-90 transition-transform duration-[5ms] rounded-md font-semibold shadow-[0_0_3px_rgb(0,0,0,0.2)]"
        >
          Geri
        </button>

        {/* #a2c29e  #b4c08a*/}
        <button
          onClick={handleNext}
          className="button-create px-2 py-1 bg-[#b8615f] hover:bg-[#d18c2a] active:scale-x-110 active:scale-y-90 transition-transform duration-[5ms] rounded-md font-semibold shadow-[0_0_3px_rgb(0,0,0,0.2)] min-w-[52px]"
        >
          İleri
        </button>
      </div>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          handleCloseModal={handleCloseModal}
          questions={questions}
        />
      )}
    </div>
  );
};

function Modal({ isOpen, handleCloseModal, questions }) {
  const modalRef = useRef(null);

  function handleClick(e) {
    if (!modalRef.current.contains(e.target)) handleCloseModal();
  }
  useEffect(() => {
    if (isOpen) document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [isOpen]);

  return (
    <div
      ref={modalRef}
      className="absolute inset-20  rounded-lg backdrop-blur-md text-white p-4 border-[1px] border-[rgba(255,255,255,0.5)] shadow-[0_0_150px_3px_rgb(0,0,0)] text-center md:text-xl "
    >
      <div className="border-[1px] order-[rgba(255,255,255,0.5)] h-full md:p-4 rounded-lg shadow-[0_0_3px_3px_rgb(0,0,0,0.2)_inset] grid place-items-center items-center">
        <p className="text-center font-bold uppercase mt-4">Sonuçlar</p>
        <div className="mb-[4rem]">
          <p className="text-white">
            Doğru:{" "}
            {questions.reduce((acc, ele) => acc + (ele.userCorrect ? 1 : 0), 0)}
          </p>
          <p className="text-white">
            Yanlış:{" "}
            {questions.reduce(
              (acc, ele) => acc + (!ele.userCorrect ? 1 : 0),
              0
            )}
          </p>
          <p>
            Başarı Oranı: %
            {(questions.reduce(
              (acc, ele) => acc + (ele.userCorrect ? 1 : 0),
              0
            ) /
              questions.length) *
              100}
          </p>
        </div>
      </div>
    </div>
  );
}
export default App;
