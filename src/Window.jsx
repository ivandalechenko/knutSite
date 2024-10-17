import React, { useState } from 'react';
import './scss/Window.scss';
import windowStore from './windowStore';
import { observer } from 'mobx-react-lite';

const Window = ({ children, type }) => {
    return (
        <div
            className={`Window window Window_${type}`}
        >
            <div
                className="title-bar"
            >
                <div className="title-bar-text">
                    <img src={`/img/links/${type}Link.png`} alt='decor' />
                    {type === 'state' && '$knut State'}
                    {type === 'roadmap' && 'Roadmap'}
                </div>
                <div className="title-bar-controls">
                    <button aria-label="Minimize" onClick={() => {
                        windowStore.setWindowStatus(type, 'minimized');
                    }}></button>
                    <button aria-label="Maximize"></button>
                    <button aria-label="Close" onClick={() => { windowStore.setWindowStatus(type, 'closed') }}></button>
                </div>
            </div>
            {/* Остальная часть окна */}
            <div>{children}</div>
        </div>
    );
};

export default observer(Window);
