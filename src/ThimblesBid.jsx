import React from 'react';
import { Connection, PublicKey, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, createTransferInstruction, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import gameStore from './gameStore'
import api from './api';

import { Buffer } from 'buffer/';
window.Buffer = Buffer;

const TOKEN_ADDRESS = "Gw9saRvRTQUyMmYBabsGibceFaFe4RKK18nrbWYZpump";
const BANK = "FG9UsNBpP57sWJBMya8TiMe1Xe6RuiQdWWL2Mmt6izkJ";
// const DEVNET_URL = "https://api.mainnet-beta.solana.com";
const DEVNET_URL = "https://sly-indulgent-wave.solana-mainnet.quiknode.pro/7738767fc1e78d5157e8c6fa4450d9abe43d5127";

const ThimblesBid = (props) => {
    const [bid, setBid] = useState(10);
    const handlePlaceABid = async () => {
        if (gameStore.thimblePlaying) {
            return 0
        }


        if (!window.solana || !window.solana.isPhantom) {
            alert("Phantom wallet не найден");
            return;
        }

        const provider = window.solana;
        const connection = new Connection(DEVNET_URL, "confirmed");
        await provider.connect();

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
            console.log("Transaction successful with signature:", signature);
            const result = await api.post('/game/bid', {
                signature, player: userPublicKey, amount: bid * 1e6,
            })
            gameStore.thibleBid(result.data.gameId)
        } catch (error) {
            console.error("Transaction failed:", error);
            alert("Ошибка при выполнении транзакции.");
        }
    }


    return (
        <div className='Thimbles_bid window'>
            <div className={`Thimbles_bid_inner ${gameStore.thimblePlaying && 'Thimbles_bid_inner_hide'}`}>

                <div className='Thimbles_bid_value'>
                    Enter your bid:
                    <input
                        type="number"
                        value={bid}
                        onChange={(e) => { setBid(e.target.value); }}
                    />
                    $KNUT
                </div>
                <button onClick={handlePlaceABid}>
                    {/* <button onClick={play}> */}
                    Place bid
                </button>
            </div>
        </div>
    )
}

export default observer(ThimblesBid)