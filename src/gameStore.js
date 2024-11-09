import { makeAutoObservable, observable } from 'mobx';

class GameStore {
    thimblesStatus = localStorage.getItem('thimblesStatus') !== 'undefined' ? localStorage.getItem('thimblesStatus') || 'wait' : 'wait';
    thimblePlaying = this.thimblesStatus !== 'wait';
    thimblesLastResult = false;
    constructor() {
        makeAutoObservable(this);
    }

    thibleBid(gameId) {
        localStorage.setItem('thimblesStatus', gameId);
        this.thimblesStatus = gameId;
        this.thimblePlaying = true;
    }

    thimblePlay() {
        localStorage.setItem('thimblesStatus', 'wait');
        this.thimblesStatus = 'wait';
        this.thimblePlaying = false;
    }

}
export default new GameStore();