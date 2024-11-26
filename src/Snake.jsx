import React, { useEffect, useRef, useState } from 'react';
import './scss/Snake.scss';
import Window from './Window';

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
        gridSize: 15, // Размер клетки (300px / 20 = 15px)
        score: 0, // Счёт
        gameOver: false, // Состояние игры
    });

    const gridCount = 20; // Количество клеток в ширину/высоту

    // Обновление состояния игры
    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');
        const interval = setInterval(() => {
            if (!gameState.gameOver) {
                updateGame();
                draw(ctx);
            }
        }, 200); // Скорость игры (200 мс)

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

    // Функция рисования на canvas
    const draw = (ctx) => {
        const { snake, food, gridSize } = gameState;

        // Очистка canvas
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // Отрисовка змейки
        ctx.fillStyle = 'black';
        snake.forEach((segment) => {
            ctx.fillRect(
                segment.x * gridSize + 2,
                segment.y * gridSize + 2,
                gridSize - 4,
                gridSize - 4
            ); // Отступы между сегментами
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
                <div className="score">Score: {gameState.score}</div>
                <canvas
                    ref={canvasRef}
                    width={300} // Ширина канваса
                    height={300} // Высота канваса
                    style={{ border: '1px solid black' }}
                />
                {gameState.gameOver && <div className="game-over">Game Over!</div>}
            </div>
        </Window>
    );
};

export default SnakeGame;
