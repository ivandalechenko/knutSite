import { makeAutoObservable, observable } from 'mobx';

class WindowStore {
    windows = {
        state: 'opened',
        roadmap: 'closed',
        whitepaper: 'closed',
        tokenomics: 'closed',
        milestones: 'closed'
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
        console.log('1234');

        // тут мне нужно получить массив тех элементов объектов windows которые не равны closed
    }


}

const windowStore = new WindowStore();
export default windowStore;