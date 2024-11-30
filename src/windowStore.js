import { makeAutoObservable, observable } from 'mobx';

class WindowStore {
    z = 0;
    windows = {
        state: window.innerWidth <= 800 || import.meta.env.DEV ? 'closed' : 'opened',
        roadmap: 'closed',
        whitepaper: 'closed',
        tokenomics: 'closed',
        milestones: 'closed',
        memes: 'closed',
        cantClose: 'closed',
        player: window.innerWidth <= 800 || import.meta.env.DEV ? 'closed' : 'opened',
        shutdown: 'closed',
        TTT: 'closed',
        paint: 'closed',
        memeGen: 'closed',
        airdrop: 'closed',
        minesweeper: 'closed',
        changeWallpaper: 'opened',

        thimbles: 'closed',
        // thimbleswm: 'closed'
        flappy: 'closed',
        flappyLeaderboard: 'closed'
    }

    constructor() {
        makeAutoObservable(this, {
            windows: observable
        });
    }


    getMaxZ() {
        this.z = this.z + 1;
        return this.z;
    }
    async setWindowStatus(win, status) {
        if (window.innerWidth <= 800) {
            this.windows[win] = status;
        } else {
            if (win !== 'state') {
                this.windows[win] = status;
            } else {
                this.windows['cantClose'] = 'opened';
            }
        }
    }
    getWindowStatus(window) {
        return this.windows[window];
    }

    getOpenedWindows() {
        const windows = Object.entries(this.windows)
            .filter(([key, value]) => value !== 'closed' && !['', ''].includes(key)) // фильтруем окна, которые не 'closed'
            .map(([key]) => key); // возвращаем только ключи
        // console.log(windows);
        return windows
    }

}

const windowStore = new WindowStore();
export default windowStore;