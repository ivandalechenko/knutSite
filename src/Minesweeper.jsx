import React, { useEffect, useState } from 'react';
import './scss/Minesweeper.scss';
import Window from './Window';
import minesweeperStore from "./minesweeperStore";
import { observer } from 'mobx-react-lite';
import TTTScore from "./TTTScore";


export default observer((props) => {


  useEffect(() => {
    minesweeperStore.newGame()
    clearInterval(minesweeperStore.timerInterval)
    minesweeperStore.timerInterval = setInterval(() => {
      minesweeperStore.timer = minesweeperStore.timer + 1;
      console.log('INTERVAL FROM DEF');

    }, 1000);
    return () => {
      console.log('clear int');
      clearInterval(minesweeperStore.timerInterval)
    }
  }, [])

  useEffect(() => {
    clearInterval(minesweeperStore.timerInterval)
    if (!minesweeperStore.gameEnd) {
      minesweeperStore.timerInterval = setInterval(() => {
        minesweeperStore.timer = minesweeperStore.timer + 1;
        console.log('INTERVAL FROM GE');
      }, 1000);
    }
  }, [minesweeperStore.gameEnd])


  const [timer, setTimer] = useState(null);

  const handlePressStart = (x, y) => {
    // Устанавливаем таймер для длительного нажатия
    const newTimer = setTimeout(() => {
      minesweeperStore.flag(x, y); // Устанавливаем флаг
    }, 500); // Время длительного нажатия (0.5 сек)

    setTimer(newTimer);
  };

  const handlePressEnd = () => {
    // Убираем таймер, если нажатие прекратилось раньше времени
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
  };

  return (
    <Window type={'minesweeper'}>
      <div className='Minesweeper'>
        <div className='Minesweeper_score'>
          <TTTScore score={minesweeperStore.countOfFlags} nocolor />
          <div className='Minesweeper_score_logo window' onClick={() => {
            minesweeperStore.newGame()
          }}>
            <img src="/img/logo.png" className={`${minesweeperStore.gameEnd && 'gameEnd'}`} alt="" />
          </div>
          <TTTScore score={minesweeperStore.timer} nocolor />
        </div>
        {
          minesweeperStore.field.length > 0 && <div className='Minesweeper_field'>
            {
              Array.from({ length: 10 }, (_, y) => {
                return (Array.from({ length: 10 }, (_, x) => {
                  const element = minesweeperStore.get(x, y)
                  return <div
                    className={`Minesweeper_element
                        ${element.minesAround === 0 && 'transparent'} 
                        ${element.minesAround === 1 && 'blue'} 
                        ${element.minesAround === 2 && 'green'} 
                        ${element.minesAround === 3 && 'red'}
                        ${element.minesAround === 4 && 'darkblue'}
                        ${element.minesAround > 4 && 'darkred'}
                        ${element.minesAround === 9 && element.opened && minesweeperStore.gameEnd && 'bgred'}

                      window${element.opened ? `_inner` : ''}`}
                    key={`ms_el_${y}-${x}`}
                    onClick={() => { !element.opened && minesweeperStore.open(x, y) }}
                    onMouseDown={() => handlePressStart(x, y)} // Для мыши
                    onMouseUp={handlePressEnd} // Для мыши
                    onMouseLeave={handlePressEnd} // Сброс при уходе курсора
                    onTouchStart={() => handlePressStart(x, y)} // Для сенсорных экранов
                    onTouchEnd={handlePressEnd} // Для сенсорных экранов
                  >
                    {
                      minesweeperStore.gameEnd
                        ? element.minesAround < 9
                          ? element.minesAround
                          : <img src="/img/games/minesweeper/mine.svg" alt="decor" />
                        : element.minesAround && element.opened
                          ? element.minesAround
                          : <>{
                            element.flag
                              ? <img src="/img/games/minesweeper/flag.svg" alt="decor" />
                              : <></>
                          }</>
                    }
                  </div>
                }))
              })
            }
          </div>
        }

      </div>
    </Window>
  )
})