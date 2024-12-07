import React from 'react';
import './scss/TTT.scss';
import Window from './Window';
import TTTScore from './TTTScore';
import { useState, useEffect } from 'react';
import api from './api';
import walletStore from './walletStore';
import windowStore from './windowStore';

const TTT = (props) => {
    const [userScore, setUserScore] = useState(0);
    const [pcScore, setPcScore] = useState(0);
    const [field, setField] = useState([['', '', ''], ['', '', ''], ['', '', '']]);
    const [myTurn, setMyTurn] = useState(true);
    const [gameOver, setGameOver] = useState(false);
    const [winningCells, setWinningCells] = useState([]);


    const resetGame = () => {
        setField([['', '', ''], ['', '', ''], ['', '', '']]);
        setMyTurn(true);
        setGameOver(false);
        setWinningCells([]);
    };

    const step = (x, y) => {
        if (!field[x][y] && myTurn && !gameOver) {
            const newField = [...field];
            newField[x][y] = 'x';
            setField(newField);
            setMyTurn(false);
            const winner = checkWinner(newField);
            console.log(winner);

            if (winner) {
                setGameOver(true);
                if (winner === 'x') {
                    const best = +localStorage.getItem('tttBest') || 0
                    setTimeout(() => {
                        setUserScore(userScore + 1);
                    }, 10);
                    if (userScore + 1 > best) {
                        localStorage.setItem('tttBest', userScore + 1)
                        const res = {
                            wallet: walletStore.wallet,
                            ttt: userScore + 1
                        }
                        const jsonString = JSON.stringify(res);
                        api.post('/leaderboard', { value: btoa(jsonString) })
                    }
                }
                return;
            }
            setTimeout(pcTurn, 500 + Math.random() * 1000);
        }
    };

    const checkWinner = (currentField) => {
        // Проверка победителя

        for (let i = 0; i < 3; i++) {
            // Проверка строк
            if (currentField[i][0] && currentField[i][0] === currentField[i][1] && currentField[i][0] === currentField[i][2]) {
                setWinningCells([[i, 0], [i, 1], [i, 2]]);
                return currentField[i][0]; // Возвращаем победителя
            }
            // Проверка столбцов
            if (currentField[0][i] && currentField[0][i] === currentField[1][i] && currentField[0][i] === currentField[2][i]) {
                setWinningCells([[0, i], [1, i], [2, i]]);
                return currentField[0][i]; // Возвращаем победителя
            }
        }
        // Проверка диагоналей
        if (currentField[0][0] && currentField[0][0] === currentField[1][1] && currentField[0][0] === currentField[2][2]) {
            setWinningCells([[0, 0], [1, 1], [2, 2]]);
            return currentField[0][0]; // Возвращаем победителя
        }
        if (currentField[0][2] && currentField[0][2] === currentField[1][1] && currentField[0][2] === currentField[2][0]) {
            setWinningCells([[0, 2], [1, 1], [2, 0]]);
            return currentField[0][2]; // Возвращаем победителя
        }

        // Проверка на ничью
        const isDraw = currentField.flat().every(cell => cell !== '');
        if (isDraw) {
            setGameOver(true);
            return 'draw'; // Возвращаем 'draw' для ничьей
        }

        return null; // Если нет победителя и нет ничьей
    };


    const pcTurn = () => {
        const winningMove = (currentField, player) => {
            for (let i = 0; i < 3; i++) {
                // Проверка строк
                if (currentField[i].filter(cell => cell === player).length === 2 && currentField[i].includes('')) {
                    return { x: i, y: currentField[i].indexOf('') };
                }
                // Проверка столбцов
                if (currentField.map(row => row[i]).filter(cell => cell === player).length === 2 && currentField.map(row => row[i]).includes('')) {
                    return { x: currentField.findIndex(row => row[i] === ''), y: i };
                }
            }
            // Проверка диагоналей
            if (currentField[0][0] === player && currentField[1][1] === player && currentField[2][2] === '') {
                return { x: 2, y: 2 };
            }
            if (currentField[0][2] === player && currentField[1][1] === player && currentField[2][0] === '') {
                return { x: 2, y: 0 };
            }
            if (currentField[2][0] === player && currentField[1][1] === player && currentField[0][2] === '') {
                return { x: 0, y: 2 };
            }
            if (currentField[0][0] === player && currentField[1][1] === player && currentField[2][2] === '') {
                return { x: 2, y: 2 };
            }
            return null;
        };

        // Проверка, может ли компьютер выиграть
        let move = winningMove(field, 'o');
        if (move) {
            const newField = [...field];
            newField[move.x][move.y] = 'o';
            setField(newField);
            setMyTurn(true);
            const winner = checkWinner(newField);
            if (winner) {
                setGameOver(true);
                if (winner === 'o') {
                    setPcScore(pcScore + 1);
                }
            }
            return;
        }

        // Проверка, может ли игрок выиграть на следующем ходу
        move = winningMove(field, 'x');
        if (move) {
            const newField = [...field];
            newField[move.x][move.y] = 'o'; // Блокируем ход игрока
            setField(newField);
            setMyTurn(true);
            const winner = checkWinner(newField);
            if (winner) {
                setGameOver(true);
                if (winner === 'x') {
                    setUserScore(userScore + 1);
                }
            }
            return;
        }

        // Если ни одно из вышеуказанных условий не выполнено, делаем случайный ход
        let availableMoves = [];
        field.forEach((row, x) => {
            row.forEach((cell, y) => {
                if (!cell) {
                    availableMoves.push({ x, y });
                }
            });
        });

        if (availableMoves.length) {
            const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            const newField = [...field];
            newField[randomMove.x][randomMove.y] = 'o';
            setField(newField);
            setMyTurn(true);
            const winner = checkWinner(newField);
            if (winner) {
                setGameOver(true);
                if (winner === 'o') {
                    setPcScore(pcScore + 1);
                }
            }
        }
    };


    useEffect(() => {
        if (gameOver) {
            setTimeout(() => {
                resetGame();
                setGameOver(false);
            }, 3000);
        }
    }, [gameOver]);

    return (
        <Window type="TTT">
            <div className='TTT'>
                <div className='TTT_reset' onClick={resetGame}>
                    <span>R</span>eset
                </div>
                <div className='TTT_game window'>
                    <div className='TTT_score window'>
                        <div className='TTT_score_el'>
                            <div className='TTT_score_img'>
                                <img src='/img/ttt/user.png' style={{ opacity: myTurn ? 1 : .3 }} alt='decor' />
                            </div>
                            <TTTScore score={userScore} />
                        </div>
                        <div className='TTT_score_el'>
                            <div className='TTT_score_img'>
                                <img src='/img/ttt/pc.png' style={{ opacity: myTurn ? .3 : 1 }} alt='decor' />
                            </div>
                            <TTTScore score={pcScore} />
                        </div>
                    </div>
                    <div className='Minesweeper_best'>
                        {
                            (+localStorage.getItem('tttBest') || 9999) < 9999 ? <>Best: {localStorage.getItem('tttBest')}</> : <></>
                        }
                        <button onClick={() => {
                            windowStore.setWindowStatus('tttLeaderboard', 'opened')
                        }}>
                            Leadeboard
                        </button>
                    </div>
                    <div className='TTT_field window'>
                        {
                            Array(3).fill(null).map((_, x) => (
                                <div className='TTT_field_row' key={x}>
                                    {
                                        Array(3).fill(null).map((_, y) => (
                                            <div
                                                className='TTT_field_row_el window'
                                                onClick={() => step(x, y)}
                                                key={y}
                                                style={{
                                                    backgroundColor: winningCells.some(cell => cell[0] === x && cell[1] === y) ? '#989eff' : 'transparent',
                                                }}
                                            >
                                                {field[x][y] && <img src={`/img/links/${field[x][y] === 'x' ? 'TTTLink' : 'round'}.png`} alt='decor' />}
                                            </div>
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </Window>
    );
};

export default TTT;
