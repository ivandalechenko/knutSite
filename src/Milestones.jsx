import React, { useEffect, useRef, useState } from 'react';
import './scss/Tokenomics.scss';
import Window from './Window';
import { gsap, TextPlugin } from 'gsap/all';

gsap.registerPlugin(TextPlugin);

const Tokenomics = (props) => {
    const textRef = useRef(null); // Ссылка на элемент с текстом
    const [textIndex, setTextIndex] = useState(0); // Индекс текущего текста

    const textArray = [
        "Phase 1 ✅",
        "Phase 2 ✅",
        "Phase 3 ✅ [JUSTICE]",
        "Loading...",
        "Rip Knut xx",
    ]; // Массив строк

    useEffect(() => {
        const animateText = () => {
            const currentText = textArray[textIndex];

            // Анимация печати текста
            gsap.to(textRef.current, {
                text: currentText, // Печатаемый текст
                duration: currentText.length * 0.1, // Скорость печати (0.1 сек на символ)
                ease: 'none', // Без ускорения
                onComplete: () => {
                    // Задержка перед стиранием текста
                    setTimeout(() => {
                        // Анимация стирания текста
                        gsap.to(textRef.current, {
                            text: '', // Стираем текст
                            duration: currentText.length * 0.05, // Скорость стирания
                            ease: 'none', // Без ускорения
                            onComplete: () => {
                                // Переход к следующему тексту
                                setTextIndex((prev) => (prev + 1) % textArray.length);
                            },
                        });
                    }, 1000); // Задержка перед стиранием 1 секунда
                },
            });
        };

        animateText();
    }, [textIndex, textArray]);

    return (
        <Window type={'milestones'}>
            <div className='Tokenomics'>
                <div className='Tokenomics_header'>
                    <img src='/img/links/milestonesLink.png' alt='decor' />
                    Milestones
                </div>
                <div className='Tokenomics_block'>
                    <div className='Tokenomics_el'>
                        <div className='Tokenomics_el_name decentralised'>
                            <span ref={textRef}></span>
                            <span className="blinking-cursor">|</span>
                        </div>
                    </div>
                </div>
            </div>
        </Window>
    );
};

export default Tokenomics;
