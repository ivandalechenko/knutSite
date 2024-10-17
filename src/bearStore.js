import { makeAutoObservable, observable } from 'mobx';

class BearStore {
    currentBear = 1;

    constructor() {
        makeAutoObservable(this);
    }

    incBear() {
        if (this.currentBear < 9) {
            this.currentBear = this.currentBear + 1
        }
    }
}

const bearStore = new BearStore();
export default bearStore;