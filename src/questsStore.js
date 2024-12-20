import { makeAutoObservable, observable } from 'mobx';
import walletStore from './walletStore';
import api from './api';
import userStore from './userStore';

class QuestsStore {
    quests = []
    rerender = 0;
    constructor() {
        makeAutoObservable(this)
    }

    initQuests = async () => {
        const qlist = await api.get('/quests')
        this.quests = qlist.data
    }
    completeQuest = (art) => {
        localStorage.setItem(`quest_${art}Completed`, true)
        this.rerender = Math.random()
    }

    claimReward = async (art) => {
        walletStore.connectWallet
        await api.post('/quests/claim', { art: art, wallet: walletStore.wallet })
        userStore.getMe()
    }
}

export default new QuestsStore();
