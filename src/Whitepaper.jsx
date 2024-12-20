import React, { useEffect, useState } from 'react';
import './scss/Whitepaper.scss';
import Window from './Window'
import questsStore from './questsStore';
const folders = ['Smart Contracts', 'Decentralized Finance (DeFi)', 'NFTs (Non-Fungible Tokens)', 'Blockchain', 'Ledger', 'Hashing', 'Crypto Mining', 'Consensus Mechanisms', 'Proof of Work (PoW)', 'Proof of Stake (PoS)', 'Validator Nodes', 'Forks (Hard Fork, Soft Fork)', 'Tokenomics', 'Crypto Wallets', 'Staking', 'Governance Tokens', 'Utility Tokens', 'Stablecoins', 'Liquidity Pools', 'Yield Farming', 'Encryption', 'Cryptographic Keys', 'Private Keys', 'Public Keys', 'Digital Signatures', 'Multi-Signature Wallets', 'Zero-Knowledge Proofs', 'Layer 1 Blockchains', 'Layer 2 Solutions', 'Gas Fees', 'On-Chain Transactions', 'Off-Chain Transactions', 'Blockchain Scalability', 'Oracles', 'Sharding', '51_ Attack', 'Byzantine Fault Tolerance', 'Secure Hash Algorithm (SHA)', 'Merkle Trees', 'Block Rewards', 'Liquidity Mining', 'Flash Loans', 'Token Swaps', 'Automated Market Makers (AMMs)', 'Decentralized Exchanges (DEXs)', 'Centralized Exchanges (CEXs)', 'Initial Coin Offering (ICO)', 'Initial DEX Offering (IDO)', 'Airdrops', 'Crypto Lending', 'Borrowing', 'Collateralization', 'Synthetic Assets', 'Perpetual Contracts', 'Derivatives', 'Market Cap', 'Trading Volume', 'Slippage', 'Arbitrage', 'Crypto Indices', 'FRED', 'HARAMBE', 'PNUT'].sort(() => Math.random() - 0.5)

const Whitepaper = (props) => {
    const [opened, setopened] = useState('');

    useEffect(() => {
        questsStore.completeQuest('whitepaper')
    }, [])
    return (
        <Window type='whitepaper'>
            <div className='Whitepaper'>
                {
                    opened ? <>
                        <div className="free_img Whitepaper_back">
                            <img src="/img/cross.png" alt="" onClick={() => {
                                setopened('')
                            }} />
                        </div>
                        <img src={`/img/whitepapers/${opened}.webp`} className='Whitepaper_content' alt="" />

                    </> : <div className='Whitepaper_list'>

                        {

                            folders.map((folder, index) => {
                                return <div className='Whitepaper_element' onClick={() => {
                                    if (folder === 'FRED') {
                                        questsStore.completeQuest('find-fred')
                                    }
                                    if (folder === 'HARAMBE') {
                                        questsStore.completeQuest('find-harambe')
                                    }
                                    if (folder === 'PNUT') {
                                        questsStore.completeQuest('find-pnut')
                                    }

                                    setopened(folder)

                                }}>
                                    <img src="/img/folder.png" alt="" />
                                    <div className='Whitepaper_element_name'>
                                        {folder}
                                    </div>
                                </div>
                            })
                        }
                    </div>
                }
            </div>
        </Window>
    )
}

export default Whitepaper