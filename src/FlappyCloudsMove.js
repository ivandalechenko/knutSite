export default async (app, position, w) => {
    const cloud1 = app.stage.children.find(el => el.label == 'cloud1')
    const cloud2 = app.stage.children.find(el => el.label == 'cloud2')
    const cloud3 = app.stage.children.find(el => el.label == 'cloud3')


    cloud1.x = w - (position / 5 % w);

    cloud2.x = (position / 7) % w;
    cloud3.x = w - (position / 9 % w);

}
