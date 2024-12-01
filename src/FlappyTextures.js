import { Assets } from './pixi';

const loadTextures = async () => {
    const textures = {}
    textures.bg = await Assets.load(`/img/flappy/bg.png`);
    textures.bearUp = await Assets.load(`/img/flappy/bearUp.png`);
    textures.bearDown = await Assets.load(`/img/flappy/bearDown.png`);
    textures.wall = await Assets.load(`/img/flappy/wall.png`);
    textures.cloud1 = await Assets.load(`/img/flappy/cloud1.png`);
    textures.cloud2 = await Assets.load(`/img/flappy/cloud2.png`);
    textures.cloud3 = await Assets.load(`/img/flappy/cloud3.png`);


    return textures
}

export default loadTextures
