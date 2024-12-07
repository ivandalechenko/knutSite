import React, { useEffect, useRef, useState } from 'react';
import './scss/Snake.scss';
import Window from './Window';
import walletStore from './walletStore';

const SnakeGame = () => {
    const canvasRef = useRef(null);
    const [gameState, setGameState] = useState({
        snake: [
            { x: 10, y: 10 },
            { x: 9, y: 10 },
            { x: 8, y: 10 },
        ], // Начальная длина змейки (3 клетки)
        food: { x: 15, y: 15 }, // Координаты еды
        direction: 'RIGHT', // Текущее направление движения
        gridSize: 16, // Размер клетки (300px / 20 = 15px)
        score: 0, // Счёт
        gameOver: false, // Состояние игры
    });

    const newGame = () => {
        console.log('meow');

        const { gameOver } = gameState;
        if (gameOver) {
            setGameState({
                snake: [
                    { x: 10, y: 10 },
                    { x: 9, y: 10 },
                    { x: 8, y: 10 },
                ], // Начальная длина змейки (3 клетки)
                food: { x: 15, y: 15 }, // Координаты еды
                direction: 'RIGHT', // Текущее направление движения
                gridSize: 16, // Размер клетки (300px / 20 = 15px)
                score: 0, // Счёт
                gameOver: false, // Состояние игры
            })
        }
    }

    const gridCount = 20; // Количество клеток в ширину/высоту

    // Обновление состояния игры
    useEffect(() => {
        if (!gameState.gameOver) {
            const ctx = canvasRef.current.getContext('2d');
            const interval = setInterval(() => {
                updateGame();
                draw(ctx);
            }, 150); // Скорость игры (200 мс)
        } else {
            const res = {
                wallet: walletStore.wallet,
                score: gameState.score
            }
            const jsonString = JSON.stringify(res);
            api.post('/snake', { value: btoa(jsonString) })
        }
        return () => clearInterval(interval);
    }, [gameState]);

    // Обработчик клавиш
    useEffect(() => {
        const handleKeyDown = (e) => {
            const { direction } = gameState;
            if (e.key === 'ArrowUp' && direction !== 'DOWN') setDirection('UP');
            if (e.key === 'ArrowDown' && direction !== 'UP') setDirection('DOWN');
            if (e.key === 'ArrowLeft' && direction !== 'RIGHT') setDirection('LEFT');
            if (e.key === 'ArrowRight' && direction !== 'LEFT') setDirection('RIGHT');
        };

        const handleTouchStart = (e) => {
            const touchStartX = e.touches[0].clientX;
            const touchStartY = e.touches[0].clientY;

            const handleTouchMove = (e) => {
                const touchEndX = e.changedTouches[0].clientX;
                const touchEndY = e.changedTouches[0].clientY;

                const diffX = touchEndX - touchStartX;
                const diffY = touchEndY - touchStartY;

                if (Math.abs(diffX) > Math.abs(diffY)) {
                    if (diffX > 0 && gameState.direction !== 'LEFT') setDirection('RIGHT');
                    else if (diffX < 0 && gameState.direction !== 'RIGHT') setDirection('LEFT');
                } else {
                    if (diffY > 0 && gameState.direction !== 'UP') setDirection('DOWN');
                    else if (diffY < 0 && gameState.direction !== 'DOWN') setDirection('UP');
                }

                window.removeEventListener('touchmove', handleTouchMove);
            };

            window.addEventListener('touchmove', handleTouchMove);
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('touchstart', handleTouchStart);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('touchstart', handleTouchStart);
        };
    }, [gameState.direction]);

    // Функция установки направления
    const setDirection = (newDirection) => {
        setGameState((prev) => ({ ...prev, direction: newDirection }));
    };

    // Функция обновления состояния игры
    const updateGame = () => {
        setGameState((prev) => {
            const newSnake = [...prev.snake];
            const head = { ...newSnake[0] };

            // Изменение координат головы змейки в зависимости от направления
            if (prev.direction === 'UP') head.y -= 1;
            if (prev.direction === 'DOWN') head.y += 1;
            if (prev.direction === 'LEFT') head.x -= 1;
            if (prev.direction === 'RIGHT') head.x += 1;

            // Проверка столкновения со стенами
            if (
                head.x < 0 ||
                head.x >= gridCount ||
                head.y < 0 ||
                head.y >= gridCount
            ) {
                return { ...prev, gameOver: true };
            }

            // Проверка столкновения с телом
            if (newSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
                return { ...prev, gameOver: true };
            }

            // Добавление новой головы
            newSnake.unshift(head);

            // Проверка на "поедание" еды
            let newFood = prev.food;
            let newScore = prev.score;
            if (head.x === prev.food.x && head.y === prev.food.y) {
                // Генерация новой еды
                newFood = {
                    x: Math.floor(Math.random() * gridCount),
                    y: Math.floor(Math.random() * gridCount),
                };
                newScore += 1; // Увеличение счёта
            } else {
                // Удаление хвоста (если не съели еду)
                newSnake.pop();
            }

            return {
                ...prev,
                snake: newSnake,
                food: newFood,
                score: newScore,
            };
        });
    };

    const draw = (ctx) => {
        const { snake, food, gridSize } = gameState;

        // Очистка canvas
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        console.log('SNAKE');
        // Отрисовка змейки
        snake.forEach((segment, index) => {
            const alpha = ((100 / snake.length) * (snake.length - index)) / 100; // Прозрачность уменьшается ближе к хвосту
            console.log(alpha);

            ctx.fillStyle = `rgba(0, 0, 0, ${Math.max(alpha, 0.2)})`; // Минимальная прозрачность 0.2

            const size = index === 0 ? gridSize - 2 : gridSize - 6; // Голова больше, тело стандартное
            const offset = (gridSize - size) / 2; // Центрируем сегменты

            ctx.fillRect(
                segment.x * gridSize + offset,
                segment.y * gridSize + offset,
                size,
                size
            );
        });

        // Отрисовка еды
        ctx.fillStyle = 'black';
        ctx.fillRect(
            food.x * gridSize + gridSize / 4,
            food.y * gridSize + gridSize / 4,
            gridSize / 2,
            gridSize / 2
        ); // Еда меньше змейки
    };




    return (
        <Window type={'snake'}>
            <div className="Snake">
                <div className="Snake_score">{formatNumber(gameState.score)}</div>
                <div className='Snake_game'>
                    {
                        gameState.gameOver && <div className='Snake_newGame free_img' onClick={() => { newGame() }}>
                            <div className='Snake_newGame_inner'>
                                New Game
                            </div>
                        </div>
                    }

                    <canvas
                        style={{ opacity: gameState.gameOver ? 0.2 : 1 }}
                        ref={canvasRef}
                        width={320} // Ширина канваса
                        height={320} // Высота канваса
                    />
                </div>
                {/* {gameState.gameOver && <div className="game-over">Game Over!</div>} */}
            </div>
        </Window>
    );
};

export default SnakeGame;

function formatNumber(num, length = 4) {
    return num.toString().padStart(length, '0');
}