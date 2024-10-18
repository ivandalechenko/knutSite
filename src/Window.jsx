import React, { useState, useRef } from 'react';
import './scss/Window.scss';
import windowStore from './windowStore';
import { observer } from 'mobx-react-lite';

const Window = ({ children, type }) => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const winRef = useRef(null);
    const dragStartRef = useRef({ offsetX: 0, offsetY: 0 });

    const handleMouseDown = (e) => {
        setIsDragging(true);
        dragStartRef.current.offsetX = e.clientX - x;
        dragStartRef.current.offsetY = e.clientY - y;
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            setX(e.clientX - dragStartRef.current.offsetX);
            setY(e.clientY - dragStartRef.current.offsetY);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Добавляем обработчики событий
    React.useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div
            className={`Window window Window_${type}`}
            ref={winRef}
            style={{ transform: `translate(${x}px, ${y}px)` }} // Исправлено на translate
            onMouseDown={handleMouseDown} // Перетаскивание при нажатии на окно
        >
            <div className="title-bar">
                <div className="title-bar-text">
                    {type !== 'cantClose' && <img src={`/img/links/${type}Link.png`} alt='decor' />}
                    {type === 'state' && '$knut State'}
                    {type === 'roadmap' && 'Roadmap'}
                    {type === 'whitepaper' && 'Whitepaper'}
                    {type === 'tokenomics' && 'Tokenomics'}
                    {type === 'milestones' && 'Milestones'}
                    {type === 'memes' && 'Memes'}
                    {type === 'shutdown' && 'Shut Down'}
                    {type === 'cantClose' && 'Error'}
                    {type === 'player' && '$knut player'}
                </div>
                <div className="title-bar-controls">
                    {!['cantClose', 'player', 'shutdown'].includes(type) && (
                        <>
                            <button aria-label="Minimize" onClick={() => {
                                windowStore.setWindowStatus(type, 'minimized');
                            }}></button>
                            <button aria-label="Maximize"></button>
                        </>
                    )}
                    <button aria-label="Close" onClick={() => { windowStore.setWindowStatus(type, 'closed'); }}></button>
                </div>
            </div>
            {/* Остальная часть окна */}
            <div>{children}</div>
        </div>
    );
};

export default observer(Window);