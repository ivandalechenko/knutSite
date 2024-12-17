import { useEffect, useRef, useState } from 'react';
import './scss/Chat.scss';
import Window from './Window';
import walletStore from './walletStore';
export default () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const chatWindowRef = useRef(null); // Реф для окна чата
    const socketRef = useRef(null);
    const reconnectInterval = useRef(null);
    const [showMuteChat, setshowMuteChat] = useState(false);
    const [chatMuted, setchatMuted] = useState(false);
    const [isAdmin, setisAdmin] = useState(false);
    // want to reply
    const [wtr, setwtr] = useState('');
    let muteTO;
    let banTO;

    useEffect(() => {
        connect();

        return () => {
            if (socketRef.current) {
                socketRef.current.onclose = null; // Отменяем реконнект
                socketRef.current.close();
            }
            clearInterval(reconnectInterval.current);
            clearTimeout(muteTO);
            clearTimeout(banTO);
        };
    }, []);

    const connect = () => {
        socketRef.current = new WebSocket('wss://ws.knut.wtf');
        // socketRef.current = new WebSocket('ws://localhost:8080');

        socketRef.current.onmessage = (event) => {
            const messageData = JSON.parse(event.data);
            console.log('new message');
            console.log(messageData);

            if (messageData.type === 'message') {
                // if (messageData.wallet !== walletStore.wallet) {
                setMessages((prevMessages) => [...prevMessages, messageData]);
                // }
            } else if (messageData.type === 'history') {
                setMessages(messageData.messages)
            } else if (messageData.type === 'muted') {
                if (messageData.muteTime > 0) {
                    setchatMuted(messageData.muteTime)
                    clearTimeout(muteTO)
                    muteTO = setTimeout(() => {
                        setchatMuted(false)
                    }, messageData.muteTime * 1000);
                } else {
                    setchatMuted(false)
                }
            } else if (messageData.type === 'admins') {
                if (messageData.list.includes(walletStore.wallet)) {
                    setisAdmin(true)
                }
            } else if (messageData.type === 'deleteMessage') {
                setMessages(prev => prev.filter(item => item._id !== messageData._id));
            } else if (messageData.type === 'ban') {
                if (messageData.wallet === walletStore.wallet) {
                    setchatMuted(messageData.time)
                    clearTimeout(banTO)
                    banTO = setTimeout(() => {
                        setchatMuted(false)
                    }, messageData.time * 1000);
                }
            } else if (messageData.type === 'banList') {
                for (let i = 0; i < messageData.list.length; i++) {
                    if (messageData.list[i].wallet === walletStore.wallet) {
                        const banTime = messageData.list[i].muteDate + messageData.list[i].muteTime - Math.floor(Date.now() / 1000)
                        if (banTime > 0) {
                            setchatMuted(banTime)
                            clearTimeout(banTO)
                            banTO = setTimeout(() => {
                                setchatMuted(false)
                            }, banTime * 1000);
                        }
                    }
                }
            } else if (messageData.type === 'updateMessage') {
                setMessages(prevMessages =>
                    prevMessages.map(msg =>
                        msg._id === messageData.message._id ? messageData.message : msg
                    )
                );
            }
        };
        socketRef.current.onclose = () => {
            console.log('Соединение закрыто. Попытка реконнекта...');
            attemptReconnect(); // Попытка реконнекта
        };
    }

    const attemptReconnect = () => {
        if (!reconnectInterval.current) {
            reconnectInterval.current = setInterval(() => {
                if (!socketRef.current || socketRef.current.readyState === WebSocket.CLOSED) {
                    connect();
                    console.log('Норм попытка');

                }
            }, 5000); // Попытка реконнекта каждые 5 секунд
        }
    }

    const sendMessage = () => {
        if (input && socketRef.current.readyState === WebSocket.OPEN) {
            const message = { wallet: walletStore.wallet, text: input, replyTo: wtr };
            socketRef.current.send(JSON.stringify(message));
            // setMessages((prevMessages) => [...prevMessages, {
            //     wallet: walletStore.wallet,
            //     text: input,
            //     plus: [],
            //     minus: [],
            //     replyTo: wtr,
            //     time: Math.floor(Date.now() / 1000),
            // }]);
            setInput('');
            setwtr('')
        }
    };
    const reactionToMessage = (id, reaction) => {
        if (socketRef.current.readyState === WebSocket.OPEN) {
            const message = { wallet: walletStore.wallet, _id: id, reaction: reaction };
            socketRef.current.send(JSON.stringify(message));
        }
    };
    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const scrollToBottom = () => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    };

    const muteChat = (time) => {
        setshowMuteChat(false)
        if (socketRef.current.readyState === WebSocket.OPEN) {
            const message = {
                service: {
                    type: "muteChat",
                    time
                }
            };
            socketRef.current.send(JSON.stringify(message));
        }
    }

    const deleteMessage = (id) => {
        if (socketRef.current.readyState === WebSocket.OPEN) {
            const message = {
                service: {
                    type: "deleteMessage",
                    _id: id
                }
            };
            socketRef.current.send(JSON.stringify(message));
        }
    }


    const banUser = (wallet, time) => {
        if (socketRef.current.readyState === WebSocket.OPEN) {
            const message = {
                service: {
                    type: "ban",
                    wallet,
                    time
                }
            };
            socketRef.current.send(JSON.stringify(message));
        }
    }

    const getNameByMessageId = (id) => {
        const message = messages.filter(message => message._id === id)[0]
        return message.wallet === walletStore.wallet ? 'you' : `${message.wallet.slice(0, 4)}...${message.wallet.slice(-4)}`
    }


    return (
        <Window type="chat">
            <div className='Chat'>
                <div className='Chat_messages window_inner' ref={chatWindowRef} style={{
                    alignContent: messages.length > 10 ? 'Unset' : 'End'
                }}>
                    {
                        messages.map((message, index) => {
                            const wallet = message.wallet ? `${message.wallet.slice(0, 4)}...${message.wallet.slice(-4)}` : 'Guest';

                            let replyToName;
                            let replyToText;
                            if (message.replyTo) {
                                const replyToMessage = messages.find(msg => msg._id === message.replyTo)
                                replyToName = `${replyToMessage.wallet.slice(0, 4)}...${replyToMessage.wallet.slice(-4)}`;
                                replyToText = replyToMessage.text.length > 21 ? `${replyToMessage.text.slice(0, 20)}...` : replyToMessage.text;
                            }

                            return <div className="Chat_message" id={`message-${message._id}`} key={`message-${message._id}`}>
                                <div className="Chat_message_info">
                                    <div className='Chat_message_author'>
                                        {message.wallet === walletStore.wallet ? 'You' : wallet} {isAdmin && <> - <span onClick={() => {
                                            deleteMessage(message._id)
                                        }}>Delete</span>  {
                                                walletStore.wallet !== message.wallet && <>
                                                    - <span onClick={() => {
                                                        banUser(message.wallet, 60 * 5)
                                                    }}>B5M</span> - <span onClick={() => {
                                                        banUser(message.wallet, 60 * 60)
                                                    }}>B1H</span> - <span onClick={() => {
                                                        banUser(message.wallet, 60 * 60 * 6)
                                                    }}>B6H</span> - <span onClick={() => {
                                                        banUser(message.wallet, 60 * 60 * 24)
                                                    }}>B24H</span>

                                                    {/* <span onClick={() => {
                                                        banUser(message.wallet, 60 * 60 * 99999)
                                                    }}>BINF</span>
                                                     */}
                                                </>
                                            }
                                        </>
                                        }
                                    </div>
                                    <div className="Chat_message_additional">
                                        <div className='Chat_message_time'>
                                            {formatTime(message.time)}
                                        </div>
                                        <div className='Chat_message_reply' onClick={() => {
                                            setwtr(message._id)
                                        }}>
                                            Reply
                                        </div>
                                        <div className='Chat_message_likes'>
                                            {
                                                message.wallet !== walletStore.wallet && <div className='Chat_message_likes_plus' onClick={() => {
                                                    reactionToMessage(message._id, 1)
                                                }}>+</div>
                                            }
                                            {message.plus.length - message.minus.length}
                                            {
                                                message.wallet !== walletStore.wallet && <div className='Chat_message_likes_minus' onClick={() => {
                                                    reactionToMessage(message._id, -1)
                                                }}>-</div>
                                            }


                                        </div>
                                    </div>
                                </div>
                                {
                                    message.replyTo && <div className="Chat_message_info">
                                        <div className="Chat_message_additional">
                                            <div className='Chat_message_inReply' onClick={() => {
                                                document.getElementById(`message-${message.replyTo}`).scrollIntoView({
                                                    behavior: 'smooth', // Плавная прокрутка
                                                    block: 'start' // Прокрутка к началу элемента
                                                });
                                            }}>
                                                in reply to - {replyToName}: {replyToText}
                                            </div>
                                        </div>
                                    </div>
                                }
                                <div className="Chat_message_text">
                                    {message.text}
                                </div>
                            </div>
                        })
                    }
                </div>
                <form className='Chat_inputBlock' onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage();
                }}>
                    {
                        !showMuteChat ? <>
                            {
                                !chatMuted ? <>
                                    <input type="text" placeholder='Type your message here' value={input} onChange={(e) => {
                                        setInput(e.target.value)
                                    }} />
                                    {
                                        wtr && <div className='inReply'>
                                            In reply to {getNameByMessageId(wtr)}
                                            <div className='inReply_cross' onClick={() => {
                                                setwtr('')
                                            }}>
                                                X
                                            </div>
                                        </div>
                                    }
                                    <button onClick={() => {
                                        sendMessage()
                                    }}>
                                        Send
                                    </button>
                                </> :
                                    <div className='muteBtn'>
                                        Chat muted ({Math.round(chatMuted / 60)}min)
                                    </div>
                            }
                            {
                                isAdmin && <div className='muteBtn' onClick={() => {
                                    setshowMuteChat(true)
                                }}>
                                    Mute chat
                                </div>
                            }
                        </> : <>
                            <div className='muteBtn' onClick={() => {
                                muteChat(0)
                            }}>
                                Unmute
                            </div>
                            <div className='muteBtn' onClick={() => {
                                muteChat(60 * 15)
                            }}>
                                15m
                            </div>
                            <div className='muteBtn' onClick={() => {
                                muteChat(60 * 60)
                            }}>
                                1h
                            </div>
                            <div className='muteBtn' onClick={() => {
                                muteChat(60 * 60 * 6)
                            }}>
                                6h
                            </div>
                            <div className='muteBtn' onClick={() => {
                                muteChat(60 * 60 * 24)
                            }}>
                                24h
                            </div>
                            <div className='muteBtn' onClick={() => {
                                muteChat(60 * 60 * 24 * 999)
                            }}>
                                Forever
                            </div>
                            <div className='muteBtn' onClick={() => {
                                setshowMuteChat(false)
                            }}>
                                Cancel
                            </div>

                        </>
                    }

                </form>
            </div>
        </Window>
    )
}

const formatTime = (timestamp) => {
    const now = new Date();
    const messageDate = new Date(timestamp * 1000);

    const isToday = now.toDateString() === messageDate.toDateString();
    const isYesterday = new Date(now.setDate(now.getDate() - 1)).toDateString() === messageDate.toDateString();

    if (isToday) {
        return messageDate.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            // second: '2-digit'
        });
    } else if (isYesterday) {
        return 'Yesterday';
    } else {
        return 'A long time ago';
    }
};