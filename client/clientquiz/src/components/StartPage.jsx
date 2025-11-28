export default function StartPage({ onStart, name, setName }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#f7f3e8] to-[#efe9db] px-4">
      <div className="max-w-xl w-full bg-white/60 backdrop-blur-md rounded-2xl p-10 border border-[#d4b98c] shadow-[0_0_25px_rgba(212,185,140,0.4)]">
        <h1 className="text-4xl font-serif font-bold text-[#1f1b1b] text-center mb-8 tracking-wide">
          Welcome to the Quiz!
        </h1>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#d4b98c] bg-[#f7f3e8] text-[#1f1b1b] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4b98c]"
          />
          <button
            onClick={onStart}
            className="py-4 px-6 w-full rounded-xl font-bold text-xl bg-[#f0e8d9] text-[#1f1b1b] border border-[#d4b98c] hover:bg-[#faefe0] transition duration-300 shadow-md hover:shadow-[0_0_18px_rgba(212,185,140,0.7)] hover:scale-[1.03]"
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
