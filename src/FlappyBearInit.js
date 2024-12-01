import { Sprite } from './pixi';

export default async (app, textures, w, h) => {
    const bear = Sprite.from(textures.bearUp)
    app.stage.addChild(bear)
    bear.label = 'bear'
    bear.width = 64
    bear.height = 43
    bear.x = w / 2
    bear.anchor.set(0.5, 0.5);
    bear.y = h
}
