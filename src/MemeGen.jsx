import React from 'react';
import './scss/MemeGen.scss';
import Window from './Window'
import { toPng } from 'html-to-image';
import { useState } from 'react';

const Attributes = ['Body', 'Accessory', 'Clothes', 'Hat', 'Sunglasses', 'BG']
const AttributesCount = [20, 19, 18, 20, 18, 20]
const AttributesNames = {
    Body: {
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "",
        8: "",
        9: "",
        10: "",
        11: "",
        12: "",
        13: "",
        14: "",
        15: "",
        16: "",
        17: "",
        18: "",
        19: "",
        20: "",
    }
}
const MemeGen = (props) => {
    const [tab, settab] = useState('Body');
    const [bear, setbear] = useState({
        Body: 0,
        Accessory: 0,
        Clothes: 0,
        Hat: 0,
        Sunglasses: 0,
        BG: 0,
    });

    const randomise = () => {
        setbear({
            Body: getRandomInt(1, AttributesCount[Attributes.indexOf("Body")]),
            Accessory: getRandomInt(1, AttributesCount[Attributes.indexOf("Accessory")]),
            Clothes: getRandomInt(1, AttributesCount[Attributes.indexOf("Clothes")]),
            Hat: getRandomInt(1, AttributesCount[Attributes.indexOf("Hat")]),
            Sunglasses: getRandomInt(1, AttributesCount[Attributes.indexOf("Sunglasses")]),
            BG: getRandomInt(1, AttributesCount[Attributes.indexOf("BG")]),
        })
    }
    const reset = () => {
        setbear({
            Body: 0,
            Accessory: 0,
            Clothes: 0,
            Hat: 0,
            Sunglasses: 0,
            BG: 0,
        })
    }
    const downloadMeme = () => {
        const node = document.getElementById('meme-bear'); // Получаем элемент для скриншота
        toPng(node)
            .then(function (dataUrl) {
                const link = document.createElement('a');
                link.download = 'meme_bear.png'; // Название файла
                link.href = dataUrl;
                link.click(); // Программное нажатие для скачивания
            })
            .catch(function (error) {
                console.error('Error on image creating', error);
            });
    };

    return (
        <Window type='memeGen'>
            <div className='MemeGen'>
                <div className='MemeGen_buttons'>
                    <div className='MemeGen_button' onClick={randomise}>
                        <span>R</span>andomise
                    </div>
                    <div className='MemeGen_button' onClick={downloadMeme}>
                        <span>D</span>ownload
                    </div>
                    <div className='MemeGen_button' onClick={reset}>
                        <span>R</span>eset
                    </div>
                </div>
                <div className='MemeGen_inner'>
                    <div className='MemeGen_content window'>
                        <div className='MemeGen_bear window' id="meme-bear">
                            {
                                bear.BG !== 0 && <div className='MemeGen_bear_el free_img'>
                                    <img src={`/img/memGen/BG/${bear.BG}.png`} alt='decor' />
                                </div>
                            }
                            {
                                bear.Body === 0 && <div className='MemeGen_bear_el free_img'>
                                    <img src='/img/memGen/knut.svg' alt='decor' />
                                </div>
                            }

                            {
                                bear.Body !== 0 && <div className='MemeGen_bear_el free_img'>
                                    <img src={`/img/memGen/Body/${bear.Body}.png`} alt='decor' />
                                </div>
                            }
                            {
                                bear.Clothes !== 0 && <div className='MemeGen_bear_el free_img'>
                                    <img src={`/img/memGen/Clothes/${bear.Clothes}.png`} alt='decor' />
                                </div>
                            }
                            {
                                bear.Accessory !== 0 && <div className='MemeGen_bear_el free_img'>
                                    <img src={`/img/memGen/Accessory/${bear.Accessory}.png`} alt='decor' />
                                </div>
                            }
                            {
                                bear.Sunglasses !== 0 && <div className='MemeGen_bear_el free_img'>
                                    <img src={`/img/memGen/Sunglasses/${bear.Sunglasses}.png`} alt='decor' />
                                </div>
                            }
                            {
                                bear.Hat !== 0 && <div className='MemeGen_bear_el free_img'>
                                    <img src={`/img/memGen/Hat/${bear.Hat}.png`} alt='decor' />
                                </div>
                            }

                        </div>
                        <div className='MemeGen_header'>
                            Customize your $knut
                        </div>
                    </div>
                    <div className='MemeGen_castomize'>
                        <div className='MemeGen_castomize_elements'>
                            {
                                Attributes.map((t) => {
                                    return <div key={`attr-${t}`} className={`MemeGen_castomize_element ${tab === t && 'MemeGen_castomize_element_selected'}`} onClick={() => { settab(t) }}>{t}</div>
                                })
                            }
                        </div>
                        <div class="window MemeGen_castomize_content">
                            {
                                Array.from({ length: AttributesCount[Attributes.indexOf(tab)] + 1 }, (_, ind) => {
                                    return <div key={`attr-${tab}-${ind}`} className={`MemeGen_castomize_content_element window ${bear[tab] === ind && "MemeGen_castomize_content_element_selected"}`} onClick={() => {
                                        const newBear = JSON.parse(JSON.stringify(bear));
                                        newBear[tab] = ind;
                                        setbear(newBear);
                                    }}>
                                        <div className='MemeGen_castomize_content_element_decor window'>
                                            {/* {
                                                tab !== 'BG' && <div className='MemeGen_castomize_content_element_decor_el free_img'>
                                                    <img src='/img/memGen/knut.svg' alt='decor' />
                                                </div>
                                            } */}
                                            {
                                                <div className={`MemeGen_castomize_content_element_decor_el 
                                                ${tab === 'Clothes' && "MemeGen_castomize_content_element_decor_el_l"} 
                                                ${tab === 'Accessory' && "MemeGen_castomize_content_element_decor_el_xl"} 
                                                ${tab === 'Accessory' && ind === 1 && "MemeGen_castomize_content_element_decor_el_bot"} 
                                                ${tab === 'Accessory' && ind === 2 && "MemeGen_castomize_content_element_decor_el_top MemeGen_castomize_content_element_decor_el_right_xl MemeGen_castomize_content_element_decor_el_xxxl"} 
                                                ${tab === 'Accessory' && ind === 3 && "MemeGen_castomize_content_element_decor_el_top MemeGen_castomize_content_element_decor_el_xxxl"} 
                                                ${tab === 'Accessory' && ind === 4 && "MemeGen_castomize_content_element_decor_el_top_xl MemeGen_castomize_content_element_decor_el_right_s MemeGen_castomize_content_element_decor_el_xl "} 
                                                ${tab === 'Accessory' && ind === 5 && "MemeGen_castomize_content_element_decor_el_top_l MemeGen_castomize_content_element_decor_el_right_xl MemeGen_castomize_content_element_decor_el_xxxl "} 
                                                ${tab === 'Accessory' && ind === 6 && "MemeGen_castomize_content_element_decor_el_top_s MemeGen_castomize_content_element_decor_el_right_l MemeGen_castomize_content_element_decor_el_xxl "} 
                                                ${tab === 'Accessory' && ind === 7 && "MemeGen_castomize_content_element_decor_el_bot_s"} 
                                                ${tab === 'Accessory' && ind === 8 && "MemeGen_castomize_content_element_decor_el_bot"} 
                                                ${tab === 'Accessory' && ind === 9 && "MemeGen_castomize_content_element_decor_el_bot MemeGen_castomize_content_element_decor_el_xxl"} 
                                                ${tab === 'Accessory' && ind === 10 && "MemeGen_castomize_content_element_decor_el_bot_xl MemeGen_castomize_content_element_decor_el_left_xs MemeGen_castomize_content_element_decor_el_xxxl"} 
                                                ${tab === 'Accessory' && ind === 11 && "MemeGen_castomize_content_element_decor_el_top_s MemeGen_castomize_content_element_decor_el_right_s MemeGen_castomize_content_element_decor_el_l"} 
                                                ${tab === 'Accessory' && ind === 12 && "MemeGen_castomize_content_element_decor_el_top MemeGen_castomize_content_element_decor_el_right_xs"} 
                                                ${tab === 'Accessory' && ind === 13 && "MemeGen_castomize_content_element_decor_el_top MemeGen_castomize_content_element_decor_el_right_s"} 
                                                ${tab === 'Accessory' && ind === 14 && "MemeGen_castomize_content_element_decor_el_top_l MemeGen_castomize_content_element_decor_el_xxxl MemeGen_castomize_content_element_decor_el_right_s"} 
                                                ${tab === 'Accessory' && ind === 15 && "MemeGen_castomize_content_element_decor_el_top_s  MemeGen_castomize_content_element_decor_el_right_s"} 
                                                ${tab === 'Accessory' && ind === 16 && "MemeGen_castomize_content_element_decor_el_top_l MemeGen_castomize_content_element_decor_el_xxxl  MemeGen_castomize_content_element_decor_el_right_xl"} 
                                                ${tab === 'Accessory' && ind === 17 && "MemeGen_castomize_content_element_decor_el_top MemeGen_castomize_content_element_decor_el_xxxl  MemeGen_castomize_content_element_decor_el_right_xl"} 
                                                ${tab === 'Accessory' && ind === 18 && "MemeGen_castomize_content_element_decor_el_top MemeGen_castomize_content_element_decor_el_xxxl  MemeGen_castomize_content_element_decor_el_right_xl"} 
                                                ${tab === 'Accessory' && ind === 19 && "MemeGen_castomize_content_element_decor_el_bot_s MemeGen_castomize_content_element_decor_el_l "} 
                                                ${tab === 'Hat' && "MemeGen_castomize_content_element_decor_el_bot_xxl MemeGen_castomize_content_element_decor_el_xxl "} 
                                                ${tab === 'Sunglasses' && "MemeGen_castomize_content_element_decor_el_bot_xxl MemeGen_castomize_content_element_decor_el_left_xs MemeGen_castomize_content_element_decor_el_xxl "} 
                                                ${ind === 0 && "MemeGen_castomize_content_element_decor_el_no"} 
                                                free_img`}>
                                                    <img src={ind > 0 ? `/img/memGen/${tab}/${ind}.png` : '/img/no.png'} alt='decor' />
                                                </div>
                                            }
                                            {/* {
                                                tab === 'BG' && <div className='MemeGen_castomize_content_element_decor_el free_img'>
                                                    <img src='/img/memGen/knut.svg' alt='decor' />
                                                </div>
                                            } */}

                                        </div>
                                        <div className='MemeGen_castomize_content_element_name'>
                                            {ind > 0 ? `#${ind}` : 'No'}
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>

            </div>
        </Window>
    )
}

export default MemeGen

function getRandomInt(min, max) {
    // Включает `min` и `max`
    return Math.floor(Math.random() * (max - min + 1)) + min;
}