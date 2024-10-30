import React from 'react';

import { useRef } from 'react';
const FIRST_SWAP_DUR = 300;
const LAST_SWAP_DUR = 100;
import { observer } from 'mobx-react-lite';
import gameStore from './gameStore'
import { useEffect } from 'react';
import { useState } from 'react';
import api from './api';

const ThimblesGameOffline = (props) => {
    const [canPlay, setcanPlay] = useState(false);
    const [showBalls, setshowBalls] = useState(true);
    const [openedThimble, setopenedThimble] = useState(0);
    useEffect(() => {
        if (gameStore.thimblesStatus !== 'wait') {
            shuffle()
        }
    }, [gameStore.thimblesStatus])

    const th = [useRef(null), useRef(null), useRef(null)]
    const shuffle = () => {
        const moves = createUniquePairs(50);
        // const moves = createUniquePairs(11);
        const STEP_SWAP_DUR = (FIRST_SWAP_DUR - LAST_SWAP_DUR) / (moves.length - 10);
        setTimeout(() => {
            setopenedThimble(-1);
            setTimeout(() => {
                setshowBalls(false)
                swap(moves, 0, FIRST_SWAP_DUR, STEP_SWAP_DUR, LAST_SWAP_DUR);
            }, 500);
        }, 500);
    }

    useEffect(() => {
        for (let i = 0; i < 3; i++) {
            th[i].current.style.transition = `transform 100ms ease-in-out`;
            if (i === openedThimble) {
                th[i].current.style.transform = `translate(0px, -60px)`;
            } else {
                th[i].current.style.transform = `translate(0px, 0px)`;
            }
        }
    }, [openedThimble])

    function createUniquePairs(numArrays) {
        const pairs = [];

        for (let i = 0; i < numArrays; i++) {
            // Создаем массив значений от 1 до 3
            const values = [1, 2, 3];

            // Перемешиваем значения для уникальности
            const shuffled = values.sort(() => Math.random() - 0.5);

            // Берем первые два значения для пары
            const uniquePair = shuffled.slice(0, 2);

            // Добавляем пару в массив пар
            pairs.push(uniquePair);
        }

        return pairs;
    }

    const swap = (moves, step, fsd, swd, lsd) => {
        console.log(step);
        const time = step > moves.length - 10 ? lsd : fsd - (swd * step);
        console.log(`sta ${time}`);

        th[moves[step][0] - 1].current.style.transition = `transform ${time}ms ease-in-out`
        th[moves[step][1] - 1].current.style.transition = `transform ${time}ms  ease-in-out`
        th[moves[step][0] - 1].current.style.transform = `translate(${(moves[step][1] - moves[step][0]) * 100}px, 0px)`
        th[moves[step][1] - 1].current.style.transform = `translate(${(moves[step][0] - moves[step][1]) * 100}px, 0px)`
        setTimeout(() => {
            th[moves[step][0] - 1].current.style.transition = `transform 0ms`
            th[moves[step][1] - 1].current.style.transition = `transform 0ms`
            th[moves[step][0] - 1].current.style.transform = `translate(0px, 0px)`
            th[moves[step][1] - 1].current.style.transform = `translate(0px, 0px)`
            if (step < moves.length - 1) {
                setTimeout(() => {
                    swap(moves, step + 1, fsd, swd, lsd)
                }, 20);
            } else {
                setcanPlay(true)
                console.log("LAST SHUFFLE");
            }
        }, time);
    }

    const play = async (num) => {
        if (canPlay) {
            gameStore.thimblePlay()
            const win = Math.random() > .6
            setopenedThimble(num)
            if (win) {
                setshowBalls(true)
            } else {
                setTimeout(() => {
                    setopenedThimble(-1)
                    setTimeout(() => {
                        setshowBalls(true)
                        setopenedThimble(getRandomExcept(num))
                    }, 100);
                }, 500);
            }
            setcanPlay(false)
        }
    }


    return (
        <div className='Thimbles_game' onClick={() => {
            if (!canPlay) {
                gameStore.thibleBid('123456')
            }
        }}>
            <div className={`Thimbles_balls ${showBalls ? 'Thimbles_balls_show' : 'Thimbles_balls_hide'}`}>
                <div className="Thimbles_ball Thimbles_ball_1 free_img">
                    <img src='/img/games/thimbles/ball.png' alt='decor' />
                </div>
                <div className="Thimbles_ball Thimbles_ball_2 free_img">
                    <img src='/img/games/thimbles/ball.png' alt='decor' />
                </div>
                <div className="Thimbles_ball Thimbles_ball_3 free_img">
                    <img src='/img/games/thimbles/ball.png' alt='decor' />
                </div>
            </div>
            <div ref={th[0]} onClick={() => { play(0) }} className="Thimbles_thimble Thimbles_thimble_1 free_img">
                <img src='/img/games/thimbles/thimble.png' className={`${canPlay && 'canBeShaked'}`} alt='decor' />
            </div>
            <div ref={th[1]} onClick={() => { play(1) }} className="Thimbles_thimble Thimbles_thimble_2 free_img">
                <img src='/img/games/thimbles/thimble.png' className={`${canPlay && 'canBeShaked'}`} alt='decor' />
            </div>
            <div ref={th[2]} onClick={() => { play(2) }} className="Thimbles_thimble Thimbles_thimble_3 free_img">
                <img src='/img/games/thimbles/thimble.png' className={`${canPlay && 'canBeShaked'}`} alt='decor' />
            </div>
        </div>
    )
}

export default observer(ThimblesGameOffline)

function getRandomExcept(exclude) {
    const numbers = [0, 1, 2];
    const filteredNumbers = numbers.filter(num => num !== exclude);
    return filteredNumbers[Math.floor(Math.random() * filteredNumbers.length)];
}