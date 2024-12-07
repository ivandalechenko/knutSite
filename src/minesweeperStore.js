import { makeAutoObservable, observable } from 'mobx';
import api from './api';
const FIELD_SIZE = 10;
const MINES_COUNT = 10;

class MinesweeperStore {
    field = [];
    score = 0;
    timer = 0;
    countOfFlags = 0;
    gameEnd = false;
    timerInterval;
    wallet = localStorage.getItem('walletConnected') || 'guest'
    minTimer = +localStorage.getItem("minesweeperBest") || 9999


    constructor() {
        makeAutoObservable(this, {
            field: observable, // Указываем явно, что field — реактивное
        });
    }

    newGame() {
        this.countOfFlags = 0;
        this.gameEnd = false;
        this.field = this.generateField(FIELD_SIZE, MINES_COUNT)
        this.timer = 0;
    }

    generateField(size, minesCount) {
        // Инициализируем пустое поле
        const field = [];
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                const cell = { x, y, minesAround: 0, opened: false, flag: false }
                makeAutoObservable(cell);
                field.push(cell);
            }
        }

        // Функция для получения соседей
        const getNeighbors = (x, y) => {
            const directions = [
                [-1, -1], [0, -1], [1, -1],
                [-1, 0], [1, 0],
                [-1, 1], [0, 1], [1, 1],
            ];
            return directions
                .map(([dx, dy]) => ({ x: x + dx, y: y + dy }))
                .filter(
                    ({ x, y }) => x >= 0 && x < size && y >= 0 && y < size
                );
        };

        // Расставляем мины случайным образом
        let placedMines = 0;
        while (placedMines < minesCount) {
            const index = Math.floor(Math.random() * field.length);
            const cell = field[index];

            if (cell.minesAround !== 9) {
                cell.minesAround = 9; // Устанавливаем мину
                placedMines++;

                // Увеличиваем счетчик для соседей
                const neighbors = getNeighbors(cell.x, cell.y);
                neighbors.forEach(({ x, y }) => {
                    const neighbor = field.find((c) => c.x === x && c.y === y);
                    if (neighbor && neighbor.minesAround !== 9) {
                        neighbor.minesAround += 1;
                    }
                });
            }
        }

        return field;
    }

    get(x, y) {
        return this.field.find(cell => cell.x === x && cell.y === y);
    }

    open(x, y) {
        if (x < FIELD_SIZE && x >= 0 && y < FIELD_SIZE && y >= 0) {
            const cell = this.get(x, y);
            if (!cell.flag && !this.gameEnd) {
                cell.opened = true;
                this.checkWin()
                if (!cell.minesAround) {
                    const neighbors = [[x + 1, y + 1], [x - 1, y - 1], [x + 1, y - 1], [x - 1, y + 1], [x + 1, y], [x - 1, y], [x, y - 1], [x, y + 1]]
                    for (let i = 0; i < neighbors.length; i++) {
                        const cell = this.get(neighbors[i][0], neighbors[i][1])
                        console.log(cell);

                        if (cell) {
                            if (!cell.opened) {
                                this.open(neighbors[i][0], neighbors[i][1])
                            }
                        }
                    }

                }
                if (cell.minesAround === 9) {
                    this.loose()
                }
            }
        }
    }

    flag(x, y) {
        const cell = this.get(x, y);
        if (cell.opened) {
            return
        }
        cell.flag = !cell.flag;
        if (cell.flag) {
            this.countOfFlags = this.countOfFlags + 1;
        } else {
            this.countOfFlags = this.countOfFlags - 1;
        }
    }

    checkWin() {
        if (this.field.filter(cell => !cell.opened).length === MINES_COUNT) {
            this.win()
        }
    }

    win() {
        this.gameEnd = true;

        if (this.timer < this.minTimer) {
            this.minTimer = this.timer
            localStorage.setItem("minesweeperBest", this.timer)
            const res = {
                wallet: this.wallet,
                minesweeper: this.timer
            }
            const jsonString = JSON.stringify(res);
            api.post('/leaderboard', { value: btoa(jsonString) })
        }
    }
    loose() {
        this.gameEnd = true;
    }


}
export default new MinesweeperStore();