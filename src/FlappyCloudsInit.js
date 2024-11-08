import { Container, Sprite } from './pixi';

export default async (app, textures, w, h) => {

    const cloud1 = Sprite.from(textures.cloud1)
    cloud1.label = 'cloud1'
    cloud1.width = 31
    cloud1.height = 14
    cloud1.x = Math.round((w / 4) * 3)
    cloud1.y = Math.round((h / 4))
    app.stage.addChild(cloud1);

    const cloud2 = Sprite.from(textures.cloud2)
    cloud2.label = 'cloud2'
    cloud2.width = 17
    cloud2.height = 10
    cloud2.x = Math.round((w / 4) * 1)
    cloud2.y = Math.round((h / 3))
    app.stage.addChild(cloud2);

    const cloud3 = Sprite.from(textures.cloud3)
    cloud3.label = 'cloud3'
    cloud3.width = 43
    cloud3.height = 22
    cloud3.x = Math.round((w / 5) * 3)
    cloud3.y = Math.round((h / 5) * 2)
    app.stage.addChild(cloud3);

}