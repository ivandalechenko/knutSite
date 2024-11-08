import Window from './Window';
import React from 'react';
import './scss/Flappy.scss';
import flappyStore from './flappyStote'
import flappyBgInit from './FlappyBg'
import flappyBgMove from './FlappyBgMove'
import flappyBearInit from './FlappyBearInit'
import flappyBearMove from './FlappyBearMove.js'
import flappyWalls from './FlappyWalls.js'
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import loadTextures from './FlappyTextures'
import { Application, Container, Sprite, ColorMatrixFilter } from './pixi';


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
                    flappyBgMove(app, flappyStore.position)
                    flappyBearMove(app, textures, flappyStore.bearPosition, delta.lastTime)
                    flappyWalls(app, textures, flappyStore.walls, flappyStore.position, flappyStore.betweenWalls, w, h)
                })


                flappyBgInit(app, textures, h)
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


    const getNow = () => {
        const currentTime = new Date();
        const seconds = String(currentTime.getSeconds()).padStart(2, '0');
        const milliseconds = String(currentTime.getMilliseconds()).padStart(3, '0');

        return `${seconds}:${milliseconds}`;
    }

    return (
        <Window type='flappy'>

            {
                flappyStore.play ? <div ref={pixiScene} id="canvasWrapperPixi" onClick={() => {
                    flappyStore.fly()
                }}></div> : <button onClick={() => { flappyStore.newGame() }}>Play</button>
            }
        </Window>
    )
}

export default observer(Flappy)