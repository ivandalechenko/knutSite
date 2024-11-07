import Window from './Window';
import React from 'react';
import './scss/Flappy.scss';
import flappyStore from './flappyStote'
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';


const Flappy = (props) => {
    const field = useRef(null);
    let tickerInt;
    useEffect(() => {
        flappyStore.newGame()
    }, [])
    useEffect(() => {
        flappyStore.init()
        if (flappyStore.play) {
            tickerInt = setInterval(() => {
                let w;
                let h;
                if (field.current) {
                    w = field.current.getBoundingClientRect().width;
                    h = field.current.getBoundingClientRect().height;
                }
                flappyStore.tik(w, h)
            }, 1000 / 60 * 1);
        }
        return () => {
            clearInterval(tickerInt)
        }
    }, [flappyStore.play])


    return (
        <Window type='flappy'>
            <div className='Flappy' ref={field} onClick={() => { flappyStore.fly() }}>
                <div className='Flappy_bear free_img' style={{ transform: `translate(0px, ${flappyStore.bearPosition}px)` }}>
                    <img src={`/img/flappy/bear${Math.round(flappyStore.speed * 100) % 2 ? 'Up' : 'Down'}.png`} style={{ transform: `rotate(${(flappyStore.bearSpeed * -1) * 5}deg)` }} alt='decor' />
                </div>
                <div className='Flappy_bg free_img' style={{ transform: `translate(-${(flappyStore.position / 2) % 200}px, 0px)` }}>
                    <img src='/img/flappy/bg.png' alt='decor' />
                    <img src='/img/flappy/bg.png' alt='decor' />
                    <img src='/img/flappy/bg.png' alt='decor' />
                    <img src='/img/flappy/bg.png' alt='decor' />
                    <img src='/img/flappy/bg.png' alt='decor' />
                </div>
                {
                    flappyStore.walls.map((wall) => {
                        return <div className='Flappy_wall free_img' style={{ transform: `translate(${(wall.num * flappyStore.betweenWalls + (flappyStore.position * -1))}px, ${wall.pos}px)` }}>
                            <div className='Flappy_wall_inner'>
                                <div className='Flappy_wall_top free_img' style={{ transform: `translate(0px,${wall.distance / 2}px)` }}>
                                    <img src='/img/flappy/wall.png' alt='decor' />
                                </div>
                                {/* <div className="Flappy_wall_num free_img">
                                    {wall.num}
                                </div> */}
                                <div className='Flappy_wall_bot free_img' style={{ transform: `translate(0px,-${wall.distance / 2}px)` }}>
                                    <img src='/img/flappy/wall.png' alt='decor' />
                                </div>
                            </div>
                        </div>
                    })
                }

            </div>
        </Window>
    )
}

export default observer(Flappy)