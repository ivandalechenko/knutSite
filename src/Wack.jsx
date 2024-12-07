import { useState, useEffect } from 'react';
import './scss/Wack.scss';
import Window from './Window';
import windowStore from './windowStore';
import walletStore from './walletStore';

const Wack = () => {
    const [time, setTime] = useState(10); // Оставшееся время
    const [score, setScore] = useState(0); // Очки
    const [holes, setHoles] = useState(Array(7).fill('empty')); // Состояние всех лунок
    const [gameOver, setGameOver] = useState(false); // Состояние окончания игры

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
                const randomHole = Math.floor(Math.random() * holes.length);
                const randomDuration = Math.random() * 1000 + 500; // От 500 мс до 1500 мс
                showKnut(randomHole, randomDuration);
            }, 500); // Появление каждые 500 мс
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
                    setScore((prevScore) => Math.max(0, prevScore - 1)); // Отнимаем 1 очко, если не был удар
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
                setScore((prevScore) => Math.max(0, prevScore - 2)); // Отнимаем 2 очка, минимум 0
            }
            return updated;
        });
    };

    const startNewGame = () => {
        setTime(10); // Сбрасываем время
        setScore(0); // Сбрасываем очки
        setHoles(Array(7).fill('empty')); // Сбрасываем лунки
        setGameOver(false); // Перезапускаем игру
    };

    return (
        <Window type="wack">
            {gameOver ? (
                <div className="Wack_gameover">
                    <div className="Wack_score_final">Game Over</div>
                    <div className="Wack_score_final">Final Score: {score}</div>
                    <button onClick={() => {
                        windowStore.setWindowStatus('snakeLeaderboard', 'opened')
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
