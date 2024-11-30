import { makeAutoObservable, observable } from 'mobx';

class WallpaperStore {
    wallpaper = localStorage.getItem('wallpaper') || 1;

    constructor() {
        makeAutoObservable(this);
    }
}

const wallpaperStore = new WallpaperStore();
export default wallpaperStore;