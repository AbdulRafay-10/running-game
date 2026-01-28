import React from 'react';

const GameOver = ({ wordsSpelled, onRestart }) => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/assets/bg.jpg')" }}>
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

      <div className="absolute top-10 text-white text-xl font-bold tracking-widest uppercase drop-shadow-lg scale-75">
        GAME OVER MENU FLOW
      </div>

      <div className="relative z-10 flex flex-col items-center gap-2 responsive-scale">
        <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">Game Over</h2>
        <p className="text-xl md:text-2xl text-white font-semibold mb-6 md:mb-8">Words Spelled: {wordsSpelled}</p>
        
        <button 
          onClick={onRestart}
          className="w-48 md:w-64 py-2 md:py-3 bg-gradient-to-b from-emerald-600 to-emerald-800 border-2 border-emerald-400 rounded-lg text-lg md:text-2xl font-bold text-white uppercase hover:scale-105 transition-all shadow-xl"
        >
          Try Again
        </button>

        <button 
          className="w-48 md:w-64 py-2 md:py-3 bg-gradient-to-b from-gray-600 to-gray-800 border-2 border-gray-400 rounded-lg text-lg md:text-2xl font-bold text-white uppercase opacity-50 cursor-not-allowed shadow-xl"
        >
          Change Avatar
        </button>
      </div>

      <div className="absolute left-10 md:left-32 bottom-10 md:bottom-16 w-32 md:w-48 h-32 md:h-48 flex items-end responsive-scale">
        <div className="relative w-32 md:w-44 h-24 md:h-32 bg-blue-700 rounded-3xl border-2 md:border-4 border-white shadow-2xl flex items-center justify-center text-white font-black p-2 md:p-4 text-xs md:text-base">
          GAME OVER
          <div className="absolute -top-8 md:-top-12 left-8 md:left-12 w-10 md:w-16 h-10 md:h-16 bg-neutral-200 rounded-full border-2 md:border-4 border-white shadow-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default GameOver;
