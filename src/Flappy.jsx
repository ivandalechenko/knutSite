import Window from './Window';
import React from 'react';
import './scss/Flappy.scss';
import flappyStore from './flappyStote'
import flappyBgInit from './FlappyBg'
import flappyBgMove from './FlappyBgMove'
import flappyBearInit from './FlappyBearInit'
import flappyBearMove from './FlappyBearMove.js'
import flappyWalls from './FlappyWalls.js'
import flappyCloudsInit from './FlappyCloudsInit.js'
import flappyCloudsMove from './FlappyCloudsMove.js'


import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import loadTextures from './FlappyTextures'
import { Application, Container, Sprite, ColorMatrixFilter } from './pixi';
import walletStore from './walletStore.js';
import windowStore from './windowStore.js';


const Flappy = (props) => {
    const pixiScene = useRef(null);

    useEffect(() => {
        if (flappyStore.play) {
            let app;
            app = new Application();

            const initGame = async () => {

                const textures = await loadTextures();
                const w = document.body.clientWidth > 800 ? 400 : document.body.clientWidth - 6;
                const h = document.body.clientWidth > 800 ? 500 : document.body.clientHeight - 122;
                await app.init({
                    antialias: false,
                    forceFXAA: false,
                    roundPixels: false,
                    background: '#E9EBFF', width: w, height: h
                });
                if (!pixiScene.current) return;
                pixiScene.current.appendChild(app.canvas);
                app.canvas.style.imageRendering = 'pixelated';

                app.ticker.add((delta) => {
                    flappyStore.tik(w, h)
                    flappyBgMove(app, flappyStore.position / 2)
                    flappyBearMove(app, textures, flappyStore.bearPosition, delta.lastTime)
                    flappyCloudsMove(app, flappyStore.position, w)
                    flappyWalls(app, textures, flappyStore.walls, flappyStore.position, flappyStore.betweenWalls, w, h)
                })


                flappyBgInit(app, textures, h)
                flappyCloudsInit(app, textures, w, h)
                flappyBearInit(app, textures, w, flappyStore.bearPosition)
                const scene = new Container();
                scene.label = 'scene';
                app.stage.addChild(scene);
            }

            initGame();

            return () => {
                if (app) {
                    app.destroy(true, { children: true, texture: true, baseTexture: true });
                }
                if (pixiScene.current) {
                    pixiScene.current.innerHTML = '';
                }
            }
        }
    }, [flappyStore.play])
    // https://x.com/intent/post?hashtags=PAWS+CULT%21+%F0%9F%90%BE&text=JOIN

    return (
        <Window type='flappy'>
            <div className='Flappy'>
                {
                    flappyStore.play ?
                        <div>
                            <div className='free_img Flappy_score'>
                                {flappyStore.score}
                            </div>
                            <div ref={pixiScene} id="canvasWrapperPixi" onClick={() => {
                                flappyStore.fly()
                            }}></div>
                        </div>
                        : <div className='Flappy_play'>
                            {flappyStore.score !== 0 && <></>}
                            <div className='Flappy_play_score_wrapper'>
                                <div className='Flappy_play_score'>
                                    <div className='Flappy_play_score_header'>
                                        SCORE:
                                    </div>
                                    <div className='Flappy_play_score_value'>
                                        {flappyStore.score}
                                    </div>
                                    <div className='Flappy_play_score_header Flappy_play_score_best'>
                                        BEST:
                                    </div>
                                    <div className='Flappy_play_score_value'>
                                        {Math.max(flappyStore.max, flappyStore.score)}
                                    </div>
                                </div>
                            </div>
                            <div className='Flappy_play_btns'>
                                <button className='Flappy_play_btn' onClick={() => { flappyStore.newGame(walletStore.wallet) }}>Play</button>
                                <a className='Flappy_play_btn' href={`https://x.com/intent/post?hashtags=KNUT&text=I+REACHED+${flappyStore.score}+POINTS+IN+FLAPPY+KNUT%0D%0A&url=https://knut.wtf%0D%0A`} target='_blank' >Share</a>
                            </div>
                            <button className='Flappy_play_btn' onClick={() => {
                                windowStore.setWindowStatus('flappyLeaderboard', 'opened')
                            }}>Leaderboard</button>
                        </div>
                }
            </div>
        </Window>
    )
}

export default observer(Flappy)