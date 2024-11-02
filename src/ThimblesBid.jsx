import React from 'react';
import { Connection, PublicKey, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, createTransferInstruction, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import gameStore from './gameStore'
import api from './api';
import { useEffect } from 'react';

import { Buffer } from 'buffer/';
window.Buffer = Buffer;


const MIN_BID = 100;
const MAX_BID = 50_000;
const TOKEN_ADDRESS = "Gw9saRvRTQUyMmYBabsGibceFaFe4RKK18nrbWYZpump";
const BANK = "FG9UsNBpP57sWJBMya8TiMe1Xe6RuiQdWWL2Mmt6izkJ";
// const DEVNET_URL = "https://api.mainnet-beta.solana.com";
const DEVNET_URL = "https://sly-indulgent-wave.solana-mainnet.quiknode.pro/7738767fc1e78d5157e8c6fa4450d9abe43d5127";

const ThimblesBid = (props) => {
    const [bid, setBid] = useState(200);
    const [walletConnected, setwalletConnected] = useState(false);
    const [waiting, setwaiting] = useState(false);
    useEffect(() => {
        const checkWallet = async () => {
            const provider = window.solana;
            // Проверка подключения
            if (provider.isConnected) {
                setwalletConnected(true)
                // await provider.connect();
            }
        }
        checkWallet()
    }, [])


    const connectWallet = async () => {
        const provider = window.solana;
        if (!provider.isConnected) {
            await provider.connect();
            setwalletConnected(true)
        }
    }

    const handlePlaceABid = async () => {
        if (gameStore.thimblePlaying) {
            return 0
        }

        const getProvider = () => {
            if ('phantom' in window) {
                const provider = window.phantom?.solana;

                if (provider?.isPhantom) {
                    return provider;
                }
            }
        }


        if (!window.solana || !window.solana.isPhantom) {
            alert("Phantom wallet не найден");
            return;
        }

        const provider = getProvider();
        const connection = new Connection(DEVNET_URL, "confirmed");
        if (!provider.isConnected) {
            await connectWallet();
            return 0;
        }

        // Получение публичного ключа пользователя
        const userPublicKey = provider.publicKey;

        // Создание адреса токена
        const tokenMintAddress = new PublicKey(TOKEN_ADDRESS);

        // Получение токен-аккаунта пользователя
        const userTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            userPublicKey,
            tokenMintAddress,
            userPublicKey
        );

        // Получение токен-аккаунта получателя
        const recipientPublicKey = new PublicKey(BANK);
        const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            userPublicKey,
            tokenMintAddress,
            recipientPublicKey
        );

        // Создание транзакции
        const transaction = new Transaction().add(
            createTransferInstruction(
                userTokenAccount.address,
                recipientTokenAccount.address,
                userPublicKey,
                // bid * 1e9, // Убедитесь, что вы указали правильное количество десятичных знаков для вашего токена
                bid * 1e6, // Убедитесь, что вы указали правильное количество десятичных знаков для вашего токена
                [],
                TOKEN_PROGRAM_ID
            )
        );

        // Получение recentBlockhash
        const { blockhash } = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhash; // Установка blockhash
        transaction.feePayer = userPublicKey; // Установка плательщика комиссии

        // Подписываем транзакцию с помощью Phantom Wallet
        try {
            const { signature } = await provider.signAndSendTransaction(transaction, {});
            setwaiting(signature)
            console.log("Transaction successful with signature:", signature);
            const result = await api.post('/game/bid', {
                signature, player: userPublicKey, amount: bid * 1e6,
            })
            gameStore.thibleBid(result.data.gameId)
            setwaiting(false)
        } catch (error) {
            setwaiting(false)
            console.error("Transaction failed:", error);
            alert("Ошибка при выполнении транзакции.");
        }


    }
    const incBid = (value) => {
        const oldBid = +bid;
        setBid(oldBid + value)
    }

    useEffect(() => {
        if (bid < MIN_BID) {
            setBid(MIN_BID)
        }
        if (bid > MAX_BID) {
            setBid(MAX_BID)
        }
    }, [bid])


    return (
        <div className='Thimbles_bid window'>
            <div className={`Thimbles_bid_inner ${gameStore.thimblePlaying && 'Thimbles_bid_inner_hide'}`}>
                {
                    waiting ? <div className='Thimbles_bid_confirmation'>
                        <div className='Thimbles_bid_confirmation_header'>
                            Waiting for transaction confirmation...
                        </div>
                        <div className='Thimbles_bid_confirmation_tx'>
                            tx: <a href={`https://solscan.io/tx/${waiting}`} target='_blank'>{waiting}</a>
                        </div>
                    </div>
                        : <>

                            {
                                walletConnected ? <>
                                    <div className='Thimbles_bid_value'>
                                        <div className="Thimbles_bid_value_header">
                                            {
                                                gameStore.thimblesLastResult ?
                                                    <>
                                                        {
                                                            gameStore.thimblesLastResult === 'win' ? <>You win!</> : <>You loose!</>
                                                        }
                                                    </> : <>Enter your bid - min {MIN_BID} - max {MAX_BID}</>
                                            }
                                        </div>
                                        <button className='Thimbles_bid_value_bb' onClick={() => { incBid(-5000) }}>
                                            - 5k
                                        </button>
                                        <button className='Thimbles_bid_value_bb' onClick={() => { incBid(-1000) }}>
                                            - 1k
                                        </button>
                                        <button className='Thimbles_bid_value_bb' onClick={() => { incBid(-100) }}>
                                            - 100
                                        </button>

                                        <input
                                            type="number"
                                            value={bid}
                                            onChange={(e) => { setBid(e.target.value); }}
                                        />
                                        <button className='Thimbles_bid_value_bb' onClick={() => { incBid(+100) }}>
                                            + 100
                                        </button>
                                        <button className='Thimbles_bid_value_bb' onClick={() => { incBid(+1000) }}>
                                            + 1k
                                        </button>
                                        <button className='Thimbles_bid_value_bb' onClick={() => { incBid(+5000) }}>
                                            + 5k
                                        </button>
                                    </div>
                                    <div className="Thimbles_bid_buttons">

                                        <button className='Thimbles_bid_value_bb' onClick={() => { setBid(MIN_BID) }}>MIN</button>
                                        <button className='Thimbles_bid_value_bb' onClick={() => {
                                            const oldBid = bid
                                            setBid(oldBid / 2)
                                        }}>/ 2</button>
                                        <button onClick={handlePlaceABid} className='Thimbles_bid_btn'>
                                            {/* <button onClick={play}> */}
                                            Place bid
                                        </button>
                                        <button className='Thimbles_bid_value_bb' onClick={() => {
                                            const oldBid = bid
                                            setBid(oldBid * 2)
                                        }}>* 2</button>
                                        <button className='Thimbles_bid_value_bb' onClick={() => { setBid(MAX_BID) }}>MAX</button>
                                    </div>
                                </>
                                    : <button className='Thimbles_bid_btn' onClick={connectWallet}>
                                        Connect Phantom wallet
                                    </button>
                            }
                        </>
                }


            </div>
        </div>
    )
}

export default observer(ThimblesBid)