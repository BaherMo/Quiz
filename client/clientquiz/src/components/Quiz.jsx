import React from 'react';

const Quiz = ({ quizData, questionIndex, handleAnswerClick }) => {
  const question = quizData[questionIndex];

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#f7f3e8] to-[#efe9db] px-4">

      <div className="max-w-2xl w-full bg-white/60 backdrop-blur-md
                      rounded-2xl p-10 border border-[#d4b98c] shadow-[0_0_25px_rgba(212,185,140,0.4)]">

        {/* Title */}
        <h2 className="text-4xl text-[#1f1b1b] font-serif font-bold text-center mb-8 tracking-wide">
          {question.question}
        </h2>

        {/* Options */}
        <div className="flex flex-col gap-4">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswerClick(option)}
              className="
                py-4 px-6 rounded-xl font-semibold text-lg
                bg-[#f0e8d9] text-[#1f1b1b]
                border border-[#d4b98c]
                hover:bg-[#faefe0]
                transition
                duration-300
                shadow-md hover:shadow-[0_0_18px_rgba(212,185,140,0.7)]
                hover:scale-[1.03]
              "
            >
              {option}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Quiz;
