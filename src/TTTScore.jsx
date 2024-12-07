import React from 'react';
import './scss/TTTScore.scss';
import { useEffect } from 'react';
import { useState } from 'react';


const TTTScore = ({ score = 0, nocolor = false }) => {
    const [updated, setupdated] = useState(false);
    let updateTO
    useEffect(() => {
        setupdated(true)
        clearTimeout(updateTO)
        updateTO = setTimeout(() => {
            setupdated(false)
        }, 3000);
    }, [score])
    return (
        <div className='TTTScore_wrapper'>
            <div className='TTTScore window'>
                {numberToArray(score).map((el) => {
                    return <img src={`/img/ttt/${updated ? nocolor ? 'red' : 'green' : 'red'}/${el}.svg`} alt='decor' />
                })}
            </div>
        </div>
    )
}

export default TTTScore

function numberToArray(num) {
    // Преобразуем число в строку, затем в массив символов
    let str = num.toString();
    let result = [];

    // Добавляем нули в начало, если строка короче 3 символов
    while (str.length < 3) {
        str = '0' + str;
    }

    // Преобразуем строку в массив чисел
    result = str.split('').map(Number);

    return result;
}