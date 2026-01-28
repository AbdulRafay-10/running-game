import React from 'react';

const StartScreen = ({ onStart }) => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/assets/bg.jpg')" }}>
      <div className="absolute inset-0 bg-wite/10"></div>

      <div className="absolute top-10 text-white text-xl font-bold tracking-widest uppercase drop-shadow-lg scale-75 md:scale-100">
        START / TITLE SCREEN
      </div>

      <div className="relative z-10 flex flex-col items-center mb-10 responsive-scale animate-[float_3s_ease-in-out_infinite]">
        <h1 className="text-8xl md:text-9xl font-black text-white italic tracking-tighter drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]">
          WORD
        </h1>
        <h1 className="text-8xl md:text-9xl font-black text-yellow-400 italic tracking-tighter -mt-6 md:-mt-10 drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]">
          JUMP
        </h1>
      </div>

      <div className="absolute left-10 md:left-20 bottom-10 md:bottom-16 w-20 md:w-28 h-28 md:h-40 bg-transparent flex items-end responsive-scale">
         <div className="relative w-20 md:w-28 h-24 md:h-36 bg-blue-600 rounded-3xl flex flex-col items-center justify-center text-white font-black text-[10px] md:text-xs text-center p-1 md:p-2 shadow-2xl border-2 md:border-4 border-white">
            RUNNING
            <div className="absolute -top-6 md:-top-10 w-8 md:w-12 h-8 md:h-12 bg-neutral-200 rounded-full border-2 md:border-4 border-white shadow-lg"></div>
            <div className="absolute -left-2 md:-left-4 top-1 md:top-2 w-3 md:w-5 h-12 md:h-18 bg-red-600 rounded-full border-1 md:border-2 border-white shadow-md"></div>
         </div>
      </div>

      <button 
        onClick={onStart}
        className="relative z-10 responsive-scale px-12 md:px-16 py-4 md:py-5 bg-gradient-to-b from-slate-700 to-slate-900 border-4 border-slate-500 rounded-2xl text-3xl md:text-4xl font-black text-white uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl"
      >
        PLAY
      </button>
    </div>
  );
};

export default StartScreen;
