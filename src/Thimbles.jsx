import React, { useState } from 'react';
import './scss/Thimbles.scss';
import Window from './Window';
import { Connection, PublicKey, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, createTransferInstruction, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Buffer } from 'buffer/';
import axios from 'axios';


window.Buffer = Buffer;

const TOKEN_ADDRESS = "7ttEK4hWrTfU7haVJHWrL2gS5FyzJmB3be6qMia9hdzj";
const RECIPIENT_ADDRESS = "FG9UsNBpP57sWJBMya8TiMe1Xe6RuiQdWWL2Mmt6izkJ";
const DEVNET_URL = "https://api.devnet.solana.com";
import { useRef } from 'react';
const FIRST_SWAP_DUR = 300;
const LAST_SWAP_DUR = 100;


const Thimbles = () => {
    const [bid, setBid] = useState(10);
    const th = [useRef(null), useRef(null), useRef(null)]
    const handlePlaceABid = async () => {
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
        const recipientPublicKey = new PublicKey(RECIPIENT_ADDRESS);
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
                bid * 1e9, // Убедитесь, что вы указали правильное количество десятичных знаков для вашего токена
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
            setTimeout(async () => {
                const result = await axios.post('http://localhost:5000/game/bid', {
                    signature, userAddress: userPublicKey, amount: bid * 1e9,
                })
            }, 1000);
        } catch (error) {
            console.error("Transaction failed:", error);
            alert("Ошибка при выполнении транзакции.");
        }



    }

    const shuffle = () => {
        const moves = createUniquePairs(50);
        const STEP_SWAP_DUR = (FIRST_SWAP_DUR - LAST_SWAP_DUR) / (moves.length - 10)
        swap(moves, 0, FIRST_SWAP_DUR, STEP_SWAP_DUR, LAST_SWAP_DUR);
    }

    const swap = (moves, step, fsd, swd, lsd) => {
        console.log(step);
        const time = step > moves.length - 10 ? lsd : fsd - (swd * step);
        console.log(`sta ${time}`);

        th[moves[step][0] - 1].current.style.transition = `transform ${time}ms ease-in-out`
        th[moves[step][1] - 1].current.style.transition = `transform ${time}ms  ease-in-out`
        th[moves[step][0] - 1].current.style.transform = `translate(${(moves[step][1] - moves[step][0]) * 100}px, 0px)`
        th[moves[step][1] - 1].current.style.transform = `translate(${(moves[step][0] - moves[step][1]) * 100}px, 0px)`
        setTimeout(() => {
            th[moves[step][0] - 1].current.style.transition = `transform 0ms`
            th[moves[step][1] - 1].current.style.transition = `transform 0ms`
            th[moves[step][0] - 1].current.style.transform = `translate(0px, 0px)`
            th[moves[step][1] - 1].current.style.transform = `translate(0px, 0px)`
            if (step < moves.length - 1) {

                setTimeout(() => {
                    swap(moves, step + 1, fsd, swd, lsd)
                }, 20);
            }
        }, time);
    }

    function createUniquePairs(numArrays) {
        const pairs = [];

        for (let i = 0; i < numArrays; i++) {
            // Создаем массив значений от 1 до 3
            const values = [1, 2, 3];

            // Перемешиваем значения для уникальности
            const shuffled = values.sort(() => Math.random() - 0.5);

            // Берем первые два значения для пары
            const uniquePair = shuffled.slice(0, 2);

            // Добавляем пару в массив пар
            pairs.push(uniquePair);
        }

        return pairs;
    }


    return (
        <Window type='thimbles'>
            <div className='Thimbles'>
                <div className='Thimbles_game'>
                    <div className="Thimbles_ball free_img">
                        <img src='/img/games/thimbles/ball.png' alt='decor' />
                    </div>
                    <div ref={th[0]} className="Thimbles_thimble Thimbles_thimble_1 free_img">
                        <img src='/img/games/thimbles/thimble.png' alt='decor' />
                    </div>
                    <div ref={th[1]} className="Thimbles_thimble Thimbles_thimble_2 free_img">
                        <img src='/img/games/thimbles/thimble.png' alt='decor' />
                    </div>
                    <div ref={th[2]} className="Thimbles_thimble Thimbles_thimble_3 free_img">
                        <img src='/img/games/thimbles/thimble.png' alt='decor' />
                    </div>
                </div>
                <div className='Thimbles_bid window'>
                    {/* <div className='Thimbles_bid_value'>
                        Enter your bid:
                        <input
                            type="number"
                            value={bid}
                            onChange={(e) => { setBid(e.target.value); }}
                        />
                    </div>
                    <button onClick={handlePlaceABid}>
                        Place bid
                    </button> */}
                    <button onClick={shuffle}>
                        game
                    </button>
                </div>
            </div>
        </Window>
    );
}

export default Thimbles;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function factorial(n) {
    if (n < 0) return undefined; // Факториал не определен для отрицательных чисел
    if (n === 0 || n === 1) return 1; // 0! и 1! равны 1
    return n * factorial(n - 1); // Рекурсивный вызов
}