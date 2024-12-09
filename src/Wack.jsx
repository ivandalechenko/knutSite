import { useState, useEffect } from 'react';
import './scss/Wack.scss';
import Window from './Window';
import windowStore from './windowStore';
import walletStore from './walletStore';
import api from './api';
const GAME_DURATION = 30

const Wack = () => {
    const [time, setTime] = useState(30); // Оставшееся время
    const [score, setScore] = useState(0); // Очки
    const [holes, setHoles] = useState(Array(12).fill('empty')); // Состояние всех лунок
    const [gameOver, setGameOver] = useState(false); // Состояние окончания игры
    const [lives, setlives] = useState(3);

    useEffect(() => {
        if (time > 0) {
            const timer = setInterval(() => setTime((prev) => prev - 1), 1000);
            return () => clearInterval(timer);
        } else {
            setGameOver(true); // Игра окончена
            const best = +localStorage.getItem('wackBest') || 0;
            if (score > best) {
                localStorage.setItem('wackBest', score)
                const res = {
                    wallet: walletStore.wallet,
                    wack: score
                }
                const jsonString = JSON.stringify(res);
                api.post('/leaderboard', { value: btoa(jsonString) })
            }
        }
    }, [time]);

    useEffect(() => {
        if (time > 0) {
            const knutInterval = setInterval(() => {
                const willSpawn = getRandomInt(0, 5)
                if (willSpawn === 0) {
                    const knutCount = getRandomInt(1, 3)
                    for (let i = 0; i < knutCount; i++) {
                        const randomHole = Math.floor(Math.random() * holes.length);
                        if (holes[randomHole] === 'empty') {
                            const randomDuration = Math.random() * 2000 + 500; // От 1000 мс до 2000 мс
                            showKnut(randomHole, randomDuration);
                        }
                    }
                }
            }, 100); // Появление каждые 500 мс
            return () => clearInterval(knutInterval);
        }
    }, [time, holes]);

    const showKnut = (index, duration) => {
        setHoles((prev) => {
            const updated = [...prev];
            updated[index] = 'knut';
            return updated;
        });

        setTimeout(() => {
            setHoles((prev) => {
                const updated = [...prev];
                if (updated[index] === 'knut') {
                    updated[index] = 'empty'; // Возвращаем пустую лунку
                    // setScore((prevScore) => Math.max(0, prevScore - 1)); // Отнимаем 1 очко, если не был удар
                }
                return updated;
            });
        }, duration);
    };

    const handleClick = (index) => {
        setHoles((prev) => {
            const updated = [...prev];
            if (updated[index] === 'knut') {
                updated[index] = 'dead';
                setScore((prevScore) => prevScore + 1);
                setTimeout(() => {
                    setHoles((prevHoles) => {
                        const resetHoles = [...prevHoles];
                        resetHoles[index] = 'empty';
                        return resetHoles;
                    });
                }, 1000); // Через 1 секунду возвращаем лунку в пустое состояние
            } else if (updated[index] === 'empty') {
                if (lives > 1) {
                    setlives(lives - 1)
                } else {
                    setGameOver(true);
                }
                // setScore((prevScore) => Math.max(0, prevScore - 2)); // Отнимаем 2 очка, минимум 0
            }
            return updated;
        });
    };

    const startNewGame = () => {
        setTime(30); // Сбрасываем время
        setScore(0); // Сбрасываем очки
        setHoles(Array(12).fill('empty')); // Сбрасываем лунки
        setGameOver(false); // Перезапускаем игру
        setlives(3)
    };

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    return (
        <Window type="wack">
            {gameOver ? (
                <div className="Wack_gameover">
                    <div className="Wack_score_final">Game Over</div>
                    <div className="Wack_score_final">Final Score: {score}</div>
                    <button onClick={() => {
                        windowStore.setWindowStatus('wackLeaderboard', 'opened')
                    }} className="wackBtn">
                        Leaderboard
                    </button>                    <button onClick={startNewGame} className="wackBtn">
                        New Game
                    </button>
                </div>
            ) : (
                <>
                    <div className="Wack_score">
                        <div className="Wack_score_time">{time} sec left</div>
                        <div className="Wack_score_lives">
                            {Array.from({ length: 3 }, (_, index) => {
                                if (index < lives) {
                                    return <img src="/img/heart.png" alt="" />
                                } else {
                                    return <img src="/img/heartBroken.png" alt="" />
                                }
                            })}
                        </div>
                        <div className="Wack_score_score">Score: {score}</div>
                    </div>
                    <div className="Wack window_inner">
                        {holes.map((state, index) => (
                            <div
                                key={index}
                                className="Wack_element"
                                onClick={() => handleClick(index)}
                            >
                                {state === 'empty' && <img src="/img/wack/empty.png" alt="" />}
                                {state === 'knut' && <img src="/img/wack/knut.png" alt="" />}
                                {state === 'dead' && <img src="/img/wack/dead.png" alt="" />}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </Window>
    );
};

export default Wack;
