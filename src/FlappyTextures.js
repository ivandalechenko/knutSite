import { Assets } from './pixi';

const loadTextures = async () => {
    const textures = {}
    textures.bg = await Assets.load(`/img/flappy/bg.png`);


    return textures
}

export default loadTextures
