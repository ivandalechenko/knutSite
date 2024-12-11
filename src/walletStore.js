import { makeAutoObservable, observable } from 'mobx';

class WalletStore {
    wallet = localStorage.getItem('walletConnected') || '';
    constructor() {
        makeAutoObservable(this);
    }

    getProvider = () => {
        if ('phantom' in window) {
            const provider = window.phantom?.solana;
            if (provider?.isPhantom) {
                return provider;
            }
        }
        return false
    };

    connectWallet = async () => {
        const provider = this.getProvider();
        if (!provider) {
            window.open('https://phantom.app/', '_blank');
        }
        if (!this.wallet) {
            const resp = await provider.connect();
            this.wallet = resp.publicKey.toString()
            localStorage.setItem('walletConnected', resp.publicKey.toString())
        }
    }
    disconnectWallet = async () => {
        const provider = this.getProvider();
        if (!provider) {
            window.open('https://phantom.app/', '_blank');
        }
        if (this.wallet) {
            await provider.disconnect();
            this.wallet = false
            localStorage.removeItem('walletConnected')
        }
    }
    changeWalletConnectedStatus = async () => {
        const provider = this.getProvider();
        if (!provider) {
            window.open('https://phantom.app/', '_blank');
        }
        if (this.wallet) {
            await provider.disconnect();
            this.wallet = false
            localStorage.removeItem('walletConnected')
        } else {
            const resp = await provider.connect();
            this.wallet = resp.publicKey.toString()
            localStorage.setItem('walletConnected', resp.publicKey.toString())
        }
    }
}

export default new WalletStore();