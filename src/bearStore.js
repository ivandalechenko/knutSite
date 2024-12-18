import { makeAutoObservable, observable } from 'mobx';
import windowStore from './windowStore';

class BearStore {
    currentBear = 1;

    constructor() {
        makeAutoObservable(this);
    }

    incBear() {
        if (this.currentBear < 9 || windowStore.getWindowStatus('state') === 'opened') {
            this.currentBear = this.currentBear + 1
        }
    }
    killBear() {
        this.currentBear = 9
    }
}

const bearStore = new BearStore();
export default bearStore;