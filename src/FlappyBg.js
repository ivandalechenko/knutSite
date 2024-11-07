import { Container, Sprite } from './pixi';

const bg = async (app, textures, h) => {
    const bg = new Container();
    bg.label = 'bg';
    app.stage.addChild(bg);
    const bgW = 152;

    const bgEl1 = Sprite.from(textures.bg)
    const bgEl2 = Sprite.from(textures.bg)
    const bgEl3 = Sprite.from(textures.bg)
    const bgEl4 = Sprite.from(textures.bg)
    const bgEl5 = Sprite.from(textures.bg)
    const bgEl6 = Sprite.from(textures.bg)
    bg.addChild(bgEl1)
    bg.addChild(bgEl2)
    bg.addChild(bgEl3)
    bg.addChild(bgEl4)
    bg.addChild(bgEl5)
    bg.addChild(bgEl6)
    bgEl1.label = 'bgEl1'
    bgEl2.label = 'bgEl2'
    bgEl3.label = 'bgEl3'
    bgEl4.label = 'bgEl4'
    bgEl5.label = 'bgEl5'
    bgEl6.label = 'bgEl6'
    bgEl1.width = bgW
    bgEl1.height = bgW / 2
    bgEl2.width = bgW
    bgEl2.height = bgW / 2
    bgEl3.width = bgW
    bgEl3.height = bgW / 2
    bgEl4.width = bgW
    bgEl4.height = bgW / 2
    bgEl5.width = bgW
    bgEl5.height = bgW / 2
    bgEl6.width = bgW
    bgEl6.height = bgW / 2

    bgEl1.x = 0
    bgEl2.x = bgW
    bgEl3.x = bgW * 2
    bgEl4.x = bgW * 3
    bgEl5.x = bgW * 4
    bgEl6.x = bgW * 5

    bgEl1.y = h - bgW / 2
    bgEl2.y = h - bgW / 2
    bgEl3.y = h - bgW / 2
    bgEl4.y = h - bgW / 2
    bgEl5.y = h - bgW / 2
    bgEl6.y = h - bgW / 2


}

export default bg
