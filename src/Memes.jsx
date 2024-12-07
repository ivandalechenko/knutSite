import React from 'react';
import './scss/Memes.scss';
import Window from './Window'
import { useState } from 'react';
const MEMES_PER_PAGE = 4;
const TOTAL_MEMES_COUNT = 96;
const baseArr = Array.from({ length: TOTAL_MEMES_COUNT }, (_, i) => i + 1);
const memesArr = shuffleArray(baseArr);

// Функция для перемешивания массива
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Случайный индекс от 0 до i
        [array[i], array[j]] = [array[j], array[i]];  // Меняем местами элементы
    }
    return array;
}

// Перемешиваем массив
console.log(baseArr);
console.log(memesArr);


const Memes = (props) => {
    const [page, setpage] = useState(0);
    const [selectedMeme, setselectedMeme] = useState(0);

    const nextPage = () => {
        setselectedMeme((prev) => (prev + 1) % TOTAL_MEMES_COUNT);
    };

    const prevPage = () => {
        setselectedMeme((prev) => (prev - 1 + TOTAL_MEMES_COUNT) % TOTAL_MEMES_COUNT);
    };


    return (
        <Window type='memes'>
            <div className='Memes'>
                <div className='Memes_selected window'>
                    <img src={`/img/memes/mem${memesArr[selectedMeme]}${memesArr[selectedMeme] > 76 ? '-min.png' : '.webp'}`} alt='decor' />
                </div>
                <div className='Memes_list window'>
                    <div className='Memes_list_content'>
                        {
                            Array.from({ length: MEMES_PER_PAGE }, (_, ind) => {
                                let index = (selectedMeme + ind) % TOTAL_MEMES_COUNT;
                                return (
                                    <div
                                        className="Memes_list_el"
                                        key={`meme_${memesArr[index]}`}
                                        onClick={() => setselectedMeme(index)}
                                    >
                                        <img
                                            src={`/img/memes/mem${memesArr[index]}${memesArr[index] > 76 ? '-min.png' : '.webp'}`}
                                            alt="decor"
                                        />
                                    </div>
                                );
                            })
                        }

                    </div>
                    <div className='Memes_list_nav'>
                        <img src="data:image/svg+xml,%3Csvg width='16' height='17' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23DFDFDF' d='M15 0H0v16h1V1h14V0z'/%3E%3Cpath fill='%23fff' d='M2 1H1v14h1V2h12V1H2z'/%3E%3Cpath fill='%23000' d='M16 17H0v-1h15V0h1v17z'/%3E%3Cpath fill='gray' d='M15 1h-1v14H1v1h14V1z'/%3E%3Cpath fill='%23B8C0C1' d='M2 2h12v13H2z'/%3E%3Cpath fill='%23000' d='M9 4H8v1H7v1H6v1H5v1h1v1h1v1h1v1h1V4z'/%3E%3C/svg%3E" alt='decor' onClick={prevPage} />
                        {/* {selectedMeme} */}
                        <img src="data:image/svg+xml,%3Csvg width='16' height='17' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23DFDFDF' d='M15 0H0v16h1V1h14V0z'/%3E%3Cpath fill='%23fff' d='M2 1H1v14h1V2h12V1H2z'/%3E%3Cpath fill='%23000' d='M16 17H0v-1h15V0h1v17z'/%3E%3Cpath fill='gray' d='M15 1h-1v14H1v1h14V1z'/%3E%3Cpath fill='%23B8C0C1' d='M2 2h12v13H2z'/%3E%3Cpath fill='%23000' d='M7 4H6v7h1v-1h1V9h1V8h1V7H9V6H8V5H7V4z'/%3E%3C/svg%3E" alt='decor' onClick={nextPage} />
                    </div>
                </div>
            </div>
        </Window>
    )
}

export default Memes