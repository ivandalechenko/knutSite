import { Assets } from './pixi';

const loadTextures = async () => {
    const textures = {}
    textures.bg = await Assets.load(`/img/flappy/bg.png`);
    textures.bearUp = await Assets.load(`/img/flappy/bearUp.png`);
    textures.bearDown = await Assets.load(`/img/flappy/bearDown.png`);


    return textures
}

export default loadTextures
