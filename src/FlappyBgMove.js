
const bg = async (app, delta) => {
    const bg = app.stage.children.find(el => el.label == 'bg')
    const bgEl1 = bg.children.find(el => el.label == 'bgEl1')
    const bgEl2 = bg.children.find(el => el.label == 'bgEl2')
    const bgEl3 = bg.children.find(el => el.label == 'bgEl3')
    const bgEl4 = bg.children.find(el => el.label == 'bgEl4')
    const bgEl5 = bg.children.find(el => el.label == 'bgEl5')
    const bgEl6 = bg.children.find(el => el.label == 'bgEl6')

    const bgElW = 152;

    bgEl1.x = bgElW * 0 - delta % bgElW
    bgEl2.x = bgElW * 1 - delta % bgElW
    bgEl3.x = bgElW * 2 - delta % bgElW
    bgEl4.x = bgElW * 3 - delta % bgElW
    bgEl5.x = bgElW * 4 - delta % bgElW
    bgEl6.x = bgElW * 5 - delta % bgElW
}

export default bg
