import React, { useState, useEffect, useRef } from 'react';

const WORDS_POOL = [
  'MONDAY', 'OWNER', 'VACATION', 'PLAYER', 'SPRING', 'FLOWER', 'GARDEN', 'BRIGHT', 'SUMMER', 'WINTER',
  'AUTUMN', 'SCHOOL', 'BICYCLE', 'KITCHEN', 'WINDOW', 'FRIEND', 'FAMILY', 'JOURNEY', 'MORNING', 'EVENING',
  'HEALTH', 'WEALTH', 'WISDOM', 'DREAMS', 'FUTURE', 'HISTORY', 'SILENT', 'LISTEN', 'STREET', 'BRIDGE',
  'ACTION', 'BEAUTY', 'CHANCE', 'DANGER', 'ENERGY', 'FLIGHT', 'GENTLE', 'HONEST', 'ISLAND', 'JUNGLE'
];

const getRandomWord = () => {
  const word = WORDS_POOL[Math.floor(Math.random() * WORDS_POOL.length)];
  const index = Math.floor(Math.random() * word.length);
  const missing = word[index];
  const display = word.substring(0, index) + '_' + word.substring(index + 1);
  return { word, missing, display };
};

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const Game = ({ onGameOver }) => {
  const [score, setScore] = useState(0);
  const [wordsSpelled, setWordsSpelled] = useState(0);
  const [currentWord, setCurrentWord] = useState(getRandomWord());
  
  const [playerY, setPlayerY] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  
  const [entities, setEntities] = useState([]);
  
  const gameRef = useRef(null);
  const requestRef = useRef();
  const lastTimeRef = useRef();
  
  const SPEED = 0.06; 
  const SPAWN_INTERVAL = 2500;
  
  const playerYRef = useRef(0);
  const velocityRef = useRef(0);
  const isJumpingRef = useRef(false);
  const entitiesRef = useRef([]);
  const scoreRef = useRef(0);
  const wordsSpelledRef = useRef(0);
  const wasteCountRef = useRef(Math.floor(Math.random() * 4)); 

  const getPhysics = () => {
    const height = gameRef.current?.clientHeight || 600;
    return {
      gravity: height * 0.0013,
      jumpPower: -(height * 0.03)
    };
  };

  const jump = () => {
    if (!isJumpingRef.current) {
      const { jumpPower } = getPhysics();
      isJumpingRef.current = true;
      setIsJumping(true);
      velocityRef.current = jumpPower;
    }
  };

  const handleEntityCollision = (entity) => {
    if (entity.type === 'letter') {
      if (entity.char === currentWord.missing) {
        scoreRef.current += 10;
        wordsSpelledRef.current += 1;
        setScore(scoreRef.current);
        setWordsSpelled(wordsSpelledRef.current);
        wasteCountRef.current = Math.floor(Math.random() * 4);
        setCurrentWord(getRandomWord());
      } else {
        onGameOver(wordsSpelledRef.current);
      }
    }
  };

  const spawnEntity = () => {
    let char;
    let isTarget = false;

    if (wasteCountRef.current > 0) {
      char = LETTERS[Math.floor(Math.random() * LETTERS.length)];
      while(char === currentWord.missing) {
        char = LETTERS[Math.floor(Math.random() * LETTERS.length)];
      }
      wasteCountRef.current -= 1;
    } else if (wasteCountRef.current === 0) {
      char = currentWord.missing;
      isTarget = true;
      wasteCountRef.current = -1; 
    }

    if (char) {
        const newEntity = {
          id: Date.now() + Math.random(),
          type: 'letter',
          char: char,
          x: 100,
          y: 40, 
          isTarget: isTarget 
        };
        entitiesRef.current = [...entitiesRef.current, newEntity];
    }
  };

  const animate = (time) => {
    if (lastTimeRef.current !== undefined) {
      const deltaTime = time - lastTimeRef.current;
      const { gravity } = getPhysics();
      const containerHeight = gameRef.current?.clientHeight || 600;

      if (isJumpingRef.current) {
        velocityRef.current += gravity;
        playerYRef.current += velocityRef.current;
        
        if (playerYRef.current >= 0) {
          playerYRef.current = 0;
          velocityRef.current = 0;
          isJumpingRef.current = false;
          setIsJumping(false);
        }
        setPlayerY(playerYRef.current);
      }

      const currentEntities = [...entitiesRef.current];
      const nextEntities = [];

      for (const e of currentEntities) {
        const nextX = e.x - (SPEED * deltaTime);
        
        if (nextX > 15 && nextX < 25) {
          const jumpPercentage = (playerYRef.current / containerHeight) * 100;
          const playerMidY = 78 + jumpPercentage - 5; 
          if (Math.abs(e.y - playerMidY) < 12) {
             handleEntityCollision(e);
             continue; 
          }
        }

        if (nextX < 5) {
            if (e.isTarget) {
                onGameOver(wordsSpelledRef.current);
                return;
            }
        }

        if (nextX > -5) {
           nextEntities.push({ ...e, x: nextX });
        }
      }
      
      entitiesRef.current = nextEntities;
      setEntities(nextEntities);

      if (wasteCountRef.current === -1 && !nextEntities.some(ent => ent.isTarget)) {
         wasteCountRef.current = Math.floor(Math.random() * 4);
      }
    }
    
    lastTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    const spawner = setInterval(spawnEntity, SPAWN_INTERVAL);
    
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      cancelAnimationFrame(requestRef.current);
      clearInterval(spawner);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentWord]);

  return (
    <div ref={gameRef} className="relative w-full h-full overflow-hidden bg-cover bg-center select-none touch-none" style={{ backgroundImage: "url('/assets/bg.jpg')" }}>
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/assets/bg.jpg')" }}></div>

      <div className="absolute top-4 md:top-8 left-4 md:left-10 z-20 responsive-scale">
        <div className="text-white text-3xl md:text-4xl font-black italic drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
          SCORE: {score}
        </div>
      </div>

      <div className="absolute top-4 md:top-12 right-6 md:right-20 z-20 responsive-scale-right">
        <div className="px-6 md:px-8 py-2 md:py-3 bg-gradient-to-r from-blue-700 to-blue-900 rounded-xl md:rounded-2xl border-2 md:border-4 border-white text-white text-3xl md:text-4xl font-black shadow-2xl tracking-[0.1em] md:tracking-[0.15em] transform hover:scale-105 transition-transform">
           {currentWord.display}
        </div>
      </div>

      {entities.map(e => (
        <div 
          key={e.id}
          className="absolute w-12 h-12 md:w-16 md:h-16 bg-gradient-to-b from-yellow-300 to-orange-500 rounded-lg md:rounded-xl flex items-center justify-center text-3xl md:text-4xl font-black text-white border-2 md:border-4 border-white shadow-[0_5px_15px_rgba(0,0,0,0.4)] z-10"
          style={{ 
            left: `${e.x}%`, 
            top: `${e.y}%`, 
            transformOrigin: 'center',
            transform: 'translate(-50%, -50%) scale(var(--ui-scale))'
          }}
        >
          {e.char}
        </div>
      ))}

      <div 
        className="absolute left-[20%] w-20 h-10 flex items-center justify-center z-10"
        style={{ 
            bottom: '15%',
            transform: 'translateX(-50%) scale(var(--ui-scale))',
            transformOrigin: 'bottom center'
        }}
      >
        <div className="text-white text-sm md:text-base font-black bg-blue-600/90 px-3 md:px-4 py-1 rounded-full whitespace-nowrap shadow-lg border-2 border-white">
            WORDS: {wordsSpelled}
        </div>
      </div>

      <div 
        className="absolute left-[20%] w-20 h-28 flex flex-col items-center justify-end z-20"
        style={{ 
            bottom: '22%', 
            transformOrigin: 'bottom center',
            transform: `translateX(-50%) translateY(${playerY}px) scale(var(--ui-scale))`,
        }}
      >
        <div className="relative w-20 h-28 bg-blue-600 rounded-2xl border-4 border-white shadow-2xl flex flex-col items-center justify-center">
            <div className={`absolute -top-8 w-10 h-10 bg-neutral-200 rounded-full border-4 border-white shadow-lg`}></div>
            <div className="absolute -left-3 top-3 w-5 h-16 bg-red-600 rounded-full border-2 border-white shadow-md"></div>
            <span className="text-xs text-white font-black drop-shadow-md tracking-tighter">
                {isJumping ? 'JUMP' : 'RUN'}
            </span>
        </div>
      </div>

      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30" style={{ transform: 'translateX(-50%) scale(var(--ui-scale))', transformOrigin: 'bottom center' }}>
        <button 
          onPointerDown={(e) => { e.preventDefault(); jump(); }}
          className="px-12 md:px-14 py-3 md:py-4 bg-gradient-to-b from-slate-700 to-slate-900 border-4 border-white rounded-3xl text-2xl md:text-3xl font-black text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)] active:translate-y-2 active:shadow-inner transition-all hover:brightness-110"
        >
          JUMP
        </button>
      </div>

      {score === 0 && (
          <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-base md:text-xl font-bold bg-black/60 px-6 md:px-8 py-2 md:py-3 rounded-full backdrop-blur-md animate-pulse z-40 border-2 border-white/30 text-center" style={{ transform: 'translate(-50%, -50%) scale(var(--ui-scale))' }}>
              TAP OR SPACE TO JUMP!
          </div>
      )}
    </div>
  );
};

export default Game;
