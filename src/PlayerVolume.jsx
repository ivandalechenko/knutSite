import React, { useState, useRef, useEffect } from 'react';
import './scss/PlayerVolume.scss';
import audioStore from './audioStore';
import { observer } from 'mobx-react-lite';

const PlayerVolume = (props) => {
    const [isDragging, setIsDragging] = useState(false);
    const sliderRef = useRef(null);

    const volumeClickHandler = (e) => {
        const rect = sliderRef.current.getBoundingClientRect();
        const newVolume = Math.min(Math.max(0, e.clientX - rect.left), rect.width) / rect.width * 100;
        audioStore.setVolume(newVolume);  // Задаем новую громкость
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        volumeClickHandler(e); // Обновляем громкость сразу при нажатии
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            volumeClickHandler(e); // Обновляем громкость при движении мыши
        }
    };

    const handleMouseUp = () => {
        if (isDragging) {
            setIsDragging(false); // Прекращаем отслеживание при отпускании мыши
        }
    };

    useEffect(() => {
        if (isDragging) {
            // Добавляем обработчики движения и отпускания мыши на весь window
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            // Удаляем обработчики, когда перестаем перетаскивать
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }

        // Очистка обработчиков, когда компонент размонтируется
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div
            className='Player_controls_vol_bar'
            ref={sliderRef}
            onMouseDown={handleMouseDown} // Начинаем перетаскивание при нажатии
        >
            <div
                className="free_img Player_controls_vol_bar_polz"
                style={{ left: `${audioStore.volume * .9}%` }}
                onMouseDown={handleMouseDown}
            >
                <img src='/img/music/volumeChanger.svg' alt='decor' />
            </div>
            <div
                className='Player_controls_vol_bar_inner'
                style={{ width: `${audioStore.volume}%` }} // Отображение текущей громкости
            >
            </div>
        </div>
    );
}

export default observer(PlayerVolume);
