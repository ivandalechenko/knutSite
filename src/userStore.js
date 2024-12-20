import { makeAutoObservable, observable } from 'mobx';
import walletStore from './walletStore';
import api from './api';

class QuestsStore {
    me = {
        quests: []
    }

    constructor() {
        makeAutoObservable(this)
    }

    getMe = async () => {
        await walletStore.connectWallet()
        const meRes = await api.get(`/user/me?wallet=${walletStore.wallet}`)
        this.me = meRes.data
    }

}
export default new QuestsStore();