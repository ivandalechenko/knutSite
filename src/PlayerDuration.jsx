
import React, { useState, useRef, useEffect } from 'react';
import './scss/PlayerDuration.scss';
import audioStore from './audioStore';
import { observer } from 'mobx-react-lite';

const PlayerDuration = (props) => {

    const [isDragging, setIsDragging] = useState(false);
    const sliderRef = useRef(null);

    const positionClickHandler = (e) => {
        const rect = sliderRef.current.getBoundingClientRect();
        const newPosition = Math.min(Math.max(0, e.clientX - rect.left), rect.width) / rect.width * 100;
        audioStore.setPosition(newPosition);  // Задаем новую громкость
        audioStore.newPos = newPosition
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        positionClickHandler(e); // Обновляем громкость сразу при нажатии
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            positionClickHandler(e); // Обновляем громкость при движении мыши
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

        <div className='Player_slider'>
            <div className='Player_slider_bar'
                ref={sliderRef}
                onMouseDown={handleMouseDown}>
                <div className='Player_slider_control_wrapper free_img'>
                    <div className='free_img Player_slider_control' style={{ left: `${audioStore.position}%` }}>
                        <img src='/img/music/slider.svg' alt='decor' />
                    </div>
                </div>
                <div className='Player_slider_bar_inner' style={{ width: `${audioStore.position}%` }}></div>
            </div>
        </div>
    )
}

export default observer(PlayerDuration)