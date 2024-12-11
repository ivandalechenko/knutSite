import { makeAutoObservable, observable } from 'mobx';
import walletStore from './walletStore';
import api from './api';

class MetricStore {
    userIdentifier = localStorage.getItem('metricId') || this.generateIDAndSaveIdToLocalStorage()
    steps = [];

    generateIDAndSaveIdToLocalStorage() {
        const timestamp = Math.floor(performance.now()).toString(16).padStart(12, '0');
        const randomPart = Array.from({ length: 12 }, () =>
            Math.floor(Math.random() * 16).toString(16)
        ).join('');
        const id = timestamp + randomPart;
        localStorage.setItem('metricId', id)

        return id;
    }

    addStep(action) {
        this.steps.push({ action, time: Math.floor(Date.now() / 1000), wallet: walletStore.wallet })
    }

    async sendMetrics() {
        await api.post('/metrics', { id: this.userIdentifier, steps: this.steps })
        this.steps = [];
    }
}
export default new MetricStore();