import { makeAutoObservable, observable } from 'mobx';
import walletStore from './walletStore';
import api from './api';

class QuestsStore {
    quests = []

    constructor() {
        makeAutoObservable(this, {
            quests: true,  // Указываем, что quests нужно сделать наблюдаемым
        })
    }

    initQuests = async () => {
        const qlist = await api.get('/quests')
        this.quests = qlist.data
    }
}
export default new QuestsStore();