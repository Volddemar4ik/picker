import React, { useEffect, useState } from 'react'
import Modal from './components/modal';
import UserColors from './components/user-colors-block';
import { getRandomElements } from './functions/random_elements';
import { defaultColors } from './components/modal/default-colors';
import './App.css';

function App() {
  const [handleModalWindow, setHandleModalWindow] = useState(false)
  const [choosedColorFromPicker, setChoosedColorFromPicker] = useState(undefined)
  const amountOfClosestColors = 7
  const [userColors, setUserColors] = useState(getRandomElements(amountOfClosestColors, defaultColors))


  useEffect(() => {
    const newColorsArray = [...userColors]

    if (choosedColorFromPicker) {
      newColorsArray.unshift(choosedColorFromPicker)
      if (newColorsArray.length > amountOfClosestColors) {
        newColorsArray.pop()
      }
    }

    setUserColors(newColorsArray)
  }, [choosedColorFromPicker])

  function openModalWindow(e) {
    e.preventDefault()
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
          <Modal close={() => setHandleModalWindow(false)} change={setChoosedColorFromPicker} />
        }
      </div>
    </div>
  )
}

export default App