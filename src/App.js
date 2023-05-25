import React, { createContext, useEffect, useState } from 'react'
import Modal from './components/modal';
import UserColors from './components/user_colors_block';
import { getRandomElements } from './components/functions/random_elements';
import { defaultColors } from './components/modal/default_colors';
import './App.css';

export const ModalWindow = createContext()

function App() {
  const [handleModalWindow, setHandleModalWindow] = useState(false)
  const [choosedColorFromPicker, setChoosedColorFromPicker] = useState(undefined)
  const [userColors, setUserColors] = useState(getRandomElements(7, defaultColors))

  // пушим новый цвет в массив цветов и удаляем последний
  useEffect(() => {
    const newColorsArray = [...userColors]

    if (choosedColorFromPicker) {
      newColorsArray.unshift(choosedColorFromPicker)
      if (newColorsArray.length > 7) {
        newColorsArray.pop()
      }
    }

    setUserColors(newColorsArray)
  }, [choosedColorFromPicker])

  // открытие модального окна
  function openModalWindow(e) {
    e.preventDefault() // не даем браузеру перезагружаться при нажатии на кнопку
    setHandleModalWindow(true)
  }

  return (
    <div className='container'>
      <div className='grout-color'>
        <div className='grout-color__title title'>
          Grout Color
        </div>
        <div className='grout-color__user-palitra'>
          <UserColors array={userColors} />
        </div>

        <div className='grout-color__user-custom-color-block'>
          <div className='grout-color__user-palitra-block' style={{ backgroundColor: `rgb(${userColors[0]?.RGB})` }} />
          <div className='grout-color__user-selected-color-name title'>{`${userColors[0]?.colorNumber} ${userColors[0]?.name}`}</div>
          <div className='grout-color__open-modal-window icon-button' onClick={openModalWindow}>
            <button className='grout-color__button-open-modal-window icon-button'>
              <i className='icon-open_modal icon'></i>
            </button>
          </div>
        </div>

        {handleModalWindow &&
          <ModalWindow.Provider value={[setHandleModalWindow, setChoosedColorFromPicker]}>
            <Modal />
          </ModalWindow.Provider>}
      </div>
    </div>
  )
}

export default App