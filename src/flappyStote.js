import { makeAutoObservable, observable } from 'mobx';
const acceleration = 0.001
const bearAcceleration = 10 / 60
const distanseBetweenWallsX = 200
const distanseBetweenWalsY = 140
const wallColliderWidth = 50;

class FlappyStore {
    betweenWalls = distanseBetweenWallsX;

    speed = .5;
    position = 0;
    bearPosition = 100;
    bearSpeed = 1;
    lastwallnum = 0;
    play = false;
    walls = []

    constructor() {
        makeAutoObservable(this, {
            walls: observable
        });
    }

    tik(w, h) {
        this.speed = this.speed + acceleration;
        this.position = this.position + this.speed;

        this.bearSpeed = this.bearSpeed - bearAcceleration;
        this.bearPosition = this.bearPosition - this.bearSpeed;

        // Обработка выхода вверх или вниз
        if (this.bearPosition < -100 || this.bearPosition > (h) + 100) {
            this.play = false;
        }

        // console.log(this.position);

        if (this.position + w / 2 > this.lastwallnum * distanseBetweenWallsX) {
            this.addWall(h)
        }
        if (this.position - w / 2 - 50 > this.walls[0].num * distanseBetweenWallsX) {
            this.removeWall()
        }
        if ((this.position + wallColliderWidth / 2) % distanseBetweenWallsX < wallColliderWidth) {
            const numOfWallToCheck = Math.round((this.position + wallColliderWidth / 2) / distanseBetweenWallsX);
            const walls = JSON.parse(JSON.stringify(this.walls));
            const wall = walls.find(item => item.num === numOfWallToCheck);
            if (wall) {
                const wallCenter = h / 2 + wall.pos;
                const bearPos = h + this.bearPosition
                // console.log(wall);
                // console.log(`h: ${h}`);
                // console.log(`bearpos: ${bearPos}`);
                // console.log(`wallcenter: ${wallCenter}`);

                const topWall = wallCenter - wall.distance / 2
                const botWall = wallCenter + wall.distance / 2
                // console.log(`topWall: ${topWall}`);
                // console.log(`botWall: ${botWall}`);
                if (bearPos < topWall || bearPos > botWall) {
                    // this.play = false;
                }

            }
        }

    }

    newGame() {
        this.play = true;
        this.speed = 1;
        this.position = 0;
        this.bearPosition = 200;
        this.bearSpeed = 5;
        this.lastwallnum = 0;
        this.walls = []
    }

    fly() {
        this.bearSpeed = 4
    }

    addWall(h) {
        this.lastwallnum = this.lastwallnum + 1;
        const newWalls = JSON.parse(JSON.stringify(this.walls));
        const newWall = {
            pos: (h / 4) * -1 + h / 2 * Math.random(),
            num: this.lastwallnum,
            distance: distanseBetweenWalsY * (1 + Math.random() / 2)
        };
        newWalls.push(newWall)
        this.walls = newWalls

    }
    removeWall() {
        const newWalls = JSON.parse(JSON.stringify(this.walls));
        newWalls.shift()
        this.walls = newWalls
    }

}

export default new FlappyStore();