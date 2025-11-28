import React from 'react';

const Result = ({ score, total, onRestart }) => (
  <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#f7f3e8] to-[#efe9db] px-4">

    <div className="max-w-xl w-full bg-white/60 backdrop-blur-md
                    rounded-2xl p-10 border border-[#d4b98c] shadow-[0_0_25px_rgba(212,185,140,0.4)]">

      <h2 className="text-4xl font-serif font-bold text-[#1f1b1b] text-center mb-8 tracking-wide">
        Your Score: {score} / {total}
      </h2>

      <button
        onClick={onRestart}
        className="
          py-4 px-6 w-full rounded-xl font-bold text-xl
          bg-[#f0e8d9] text-[#1f1b1b]
          border border-[#d4b98c]
          hover:bg-[#faefe0]
          transition
          duration-300
          shadow-md hover:shadow-[0_0_18px_rgba(212,185,140,0.7)]
          hover:scale-[1.03]
        "
      >
        Restart Quiz
      </button>

    </div>

  </div>
);

export default Result;
