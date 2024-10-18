import { makeAutoObservable, observable } from 'mobx';

class WindowStore {
    windows = {
        state: 'opened',
        roadmap: 'closed',
        whitepaper: 'closed',
        tokenomics: 'closed',
        milestones: 'closed',
        memes: 'closed',
        cantClose: 'closed',
        player: 'closed',
        shutdown: 'opened',
    }

    constructor() {
        makeAutoObservable(this, {
            windows: observable
        });
    }

    setWindowStatus(window, status) {
        if (window !== 'state') {
            this.windows[window] = status;
        } else {
            this.windows['cantClose'] = 'opened';
        }
    }
    getWindowStatus(window) {
        return this.windows[window];
    }

    getOpenedWindows() {
        const windows = Object.entries(this.windows)
            .filter(([key, value]) => value !== 'closed' && !['cantClose', 'player'].includes(key)) // фильтруем окна, которые не 'closed'
            .map(([key]) => key); // возвращаем только ключи
        console.log(windows);
        return windows
    }

}

const windowStore = new WindowStore();
export default windowStore;