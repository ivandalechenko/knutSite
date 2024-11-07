import Window from './Window';
import React from 'react';
import './scss/Flappy.scss';
import flappyStore from './flappyStote'
import flappyBgInit from './FlappyBg'
import flappyBgMove from './FlappyBgMove'

import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import loadTextures from './FlappyTextures'
import { Application, Container, Sprite, ColorMatrixFilter } from './pixi';


const Flappy = (props) => {
    const pixiScene = useRef(null);

    const field = useRef(null);
    useEffect(() => {
        flappyStore.newGame()
    }, [])
    useEffect(() => {
        let app;
        const initGame = async () => {
            app = new Application();
            const textures = await loadTextures();
            const w = document.body.clientWidth > 800 ? 400 : document.body.clientWidth - 6;
            const h = document.body.clientWidth > 800 ? 500 : document.body.clientHeight - 122;
            await app.init({
                antialias: false,
                forceFXAA: false,
                roundPixels: false,
                background: '#E9EBFF', width: w, height: h
            });
            app.canvas.style.imageRendering = 'pixelated';
            if (!pixiScene.current) return;

            if (flappyStore.play) {
                app.ticker.add((delta) => {
                    flappyStore.tik(w, h)
                    console.log(flappyStore.position);

                    flappyBgMove(app, flappyStore.position)
                })
            }

            // app.canvas.height = document.body.clientHeight
            pixiScene.current.appendChild(app.canvas);

            flappyBgInit(app, textures, h)

            const scene = new Container();
            scene.label = 'scene';
            app.stage.addChild(scene);

            flappyStore.init()


        }

        initGame();

        return () => {
            if (app) {
                app.destroy(true, { children: true, texture: true, baseTexture: true });
            }
        }
    }, [flappyStore.play])


    return (
        <Window type='flappy'>
            <div ref={pixiScene} id="canvasWrapperPixi"></div>
        </Window>
    )
}

export default observer(Flappy)