import { Container, Sprite } from './pixi';
export default async (app, textures, walls, position, betweenWalls, w, h) => {

    // чекать есть ли старая стенка
    const oldWall = app.stage.children.find(el => el.label == `wall${walls[0].num - 1}`)
    if (oldWall) {
        app.stage.removeChild(oldWall)
    }


    for (let i = 0; i < walls.length; i++) {
        const wall = app.stage.children.find(el => el.label == `wall${walls[i].num}`)

        if (wall) {
            wall.x = walls[i].num * betweenWalls + position * -1
            // console.log(walls[i].);

        } else {
            const wall = new Container();

            const top = Sprite.from(textures.wall)
            top.width = 32;
            top.height = 452;
            top.x = w / 2;
            top.y = h / 2 - walls[i].distance / 2;
            top.anchor.set(0.5, 0)
            top.rotation = Math.PI

            const bot = Sprite.from(textures.wall)
            bot.width = 32;
            bot.height = 452;
            bot.x = w / 2;
            bot.y = h / 2 + walls[i].distance / 2;
            bot.anchor.set(0.5, 0)
            // bot.rotation = Math.PI

            wall.addChild(top)
            wall.addChild(bot)

            wall.x = w;
            wall.y = walls[i].pos;
            wall.label = `wall${walls[i].num}`
            app.stage.addChild(wall)
        }
    }

    // <div className='Flappy_wall free_img' style={{ transform: `translate(${(wall.num * flappyStore.betweenWalls + (flappyStore.position * -1))}px, ${wall.pos}px)` }}>
    //                         <div className='Flappy_wall_inner'>
    //                             <div className='Flappy_wall_top free_img' style={{ transform: `translate(0px,${wall.distance / 2}px)` }}>
    //                                 <img src='/img/flappy/wall.png' alt='decor' />
    //                             </div>
    //                             {/* <div className="Flappy_wall_num free_img">
    //                                 {wall.num}
    //                             </div> */}
    //                             <div className='Flappy_wall_bot free_img' style={{ transform: `translate(0px,-${wall.distance / 2}px)` }}>
    //                                 <img src='/img/flappy/wall.png' alt='decor' />
    //                             </div>
    //                         </div>
    //                     </div>

}
