import { makeAutoObservable, observable } from 'mobx';

class WindowStore {
    windows = {
        state: 'closer',
        roadmap: 'closed',
        whitepaper: 'closed',
        tokenomics: 'closed',
        milestones: 'closed',
        memes: 'opened',
        shutdown: 'opened'
    }

    constructor() {
        makeAutoObservable(this, {
            windows: observable
        });
    }

    setWindowStatus(window, status) {
        this.windows[window] = status;
    }
    getWindowStatus(window) {
        return this.windows[window];
    }

    getOpenedWindows() {
        const windows = Object.entries(this.windows)
            .filter(([key, value]) => value !== 'closed') // фильтруем окна, которые не 'closed'
            .map(([key]) => key); // возвращаем только ключи
        console.log(windows);
        return windows
    }

}

const windowStore = new WindowStore();
export default windowStore;