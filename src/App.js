import React, { useEffect, useState } from 'react'
import Modal from './components/modal';
import UserColorsBlock from './components/colors-block';
import { getRandomElements } from './functions/random_elements';
import { defaultColors } from './components/modal/default-colors';
import './App.css';

function App() {
  const [handleModalWindow, setHandleModalWindow] = useState(false)
  const [choosedColorFromPicker, setChoosedColorFromPicker] = useState(undefined)
  const amountOfClosestColors = 7
  const [randomColors, setRandomColors] = useState(getRandomElements(amountOfClosestColors, defaultColors))
  const [choosedUserColor, setChoosedUserColor] = useState({ key: null, color: {} })

  useEffect(() => {
    const newColorsArray = [...randomColors]

    if (choosedColorFromPicker) {
      newColorsArray.unshift(choosedColorFromPicker)
      if (newColorsArray.length > amountOfClosestColors) {
        newColorsArray.pop()
      }
    }

    setRandomColors(newColorsArray)
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
          {randomColors.map((item, index) => (
            <UserColorsBlock
              color={item}
              key={index}
              choosedColor={choosedUserColor}
              setChoosedColor={setChoosedUserColor}
              keyIndex={index}
            />
          ))}
        </div>

        <div className='grout-color__user-custom-color-block'>
          <div className='grout-color__user-palitra-block' style={{ backgroundColor: `rgb(${randomColors[0]?.RGB})` }} />
          <div className='grout-color__user-selected-color-name title'>{`${randomColors[0]?.colorNumber} ${randomColors[0]?.name}`}</div>
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