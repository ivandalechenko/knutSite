export default async (app, textures, pos, time) => {
    const bear = app.stage.children.find(el => el.label == 'bear')
    bear.y = pos;
    bear.angle = pos / 4 - 50;
    bear.counter = !bear.counter ? 1 : bear.counter + 1;
    if (bear.counter > 10) {
        bear.texture = bear.texture.label.includes('bearDown') ? textures.bearUp : textures.bearDown;
        bear.counter = 1;
    }

}
