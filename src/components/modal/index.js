// import { useState } from "react"
// import { ChromePicker } from "react-color"
// import { сlosestColors } from "../functions"
// import './style.css'


// export default function Modal({ active, setActive, setColor }) {
//     const [choosedColor, setChoosedColor] = useState('')
//     const [selectedBlock, setSelectedBlock] = useState(null)
//     const [currenColor, setCurrentColor] = useState('#000000')
//     const [newColors, setNewColors] = useState([])


//     // вот это нужно переписать, чтобы был не массив с 7 копипастами, а чисто один блок и потом инкриментится
//     const colors = [
//         { id: 'closest-color-01', itemId: 0, bgColor: newColors[0]?.color?.RGB },
//         { id: 'closest-color-02', itemId: 1, bgColor: newColors[1]?.color?.RGB },
//         { id: 'closest-color-03', itemId: 2, bgColor: newColors[2]?.color?.RGB },
//         { id: 'closest-color-04', itemId: 3, bgColor: newColors[3]?.color?.RGB },
//         { id: 'closest-color-05', itemId: 4, bgColor: newColors[4]?.color?.RGB },
//         { id: 'closest-color-06', itemId: 5, bgColor: newColors[5]?.color?.RGB },
//         { id: 'closest-color-07', itemId: 6, bgColor: newColors[6]?.color?.RGB }
//     ]

//     const handleOnChange = color => {
//         setCurrentColor(color)
//         setNewColors(сlosestColors(color?.hex))
//     }

//     const handleBlockClick = blockId => {
//         setSelectedBlock(blockId)
//     }

//     function handleNewColor(item, selectedBlock) {
//         if (newColors) {
//             handleBlockClick(selectedBlock)
//             setChoosedColor(newColors[item].color)
//         }
//     }

//     function selectColor() {
//         if (choosedColor.RGB) {
//             setColor(choosedColor)
//             setActive(false)
//         }
//     }

//     return (
//         <div className={active
//             ? "custom-grout-color-block__modul-window-show"
//             : "custom-grout-color-block__modul-window"}>
//             <div className="modul-window">
//                 <div className="modul-window__header">
//                     <span className="icon-clear" onClick={() => setActive(false)}></span>
//                 </div>

//                 <div className="modul-window__picker">
//                     <ChromePicker
//                         color={currenColor}
//                         onChange={handleOnChange}
//                         disableAlpha={true}
//                         className="custom-chrome-picker"
//                     />
//                 </div>

//                 <div className="modul-window__closest-grout-color">
//                     <div className="modul-window__title title">Matching Grout Colors</div>

//                     <div className="grout-color-block__select-colors">
//                         {colors?.map(item => (
//                             <div className={`${(selectedBlock === item.id) && 'main-block__select-color-item_active'} main-block__select-color-item`} onClick={() => handleNewColor(item.itemId, item.id)} key={item.id} style={{ backgroundColor: `rgb(${item.bgColor})` }}>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 <div className="modul-window__action-zone">
//                     <div className="modul-window__button">
//                         <button className="modul-window__upload-button button button_active" onClick={selectColor}>Apply</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }


import React, { useContext, useEffect, useState } from 'react'
import { ChromePicker } from "react-color"
import { ModalWindow } from '../../App'
import { сlosestColors } from "../functions/closest_colors"
import './style.css'

export default function Modal() {
    const [handleModalWindow, choosedColorFromPicker] = useContext(ModalWindow)
    const [pickerColor, setPickerColor] = useState('#FFFFFF')
    const [newClosestColors, setNewClosestColors] = useState([])
    const [choosedColor, setChoosedColor] = useState(undefined)

    // отслеживаем изменение цвета picker
    useEffect(() => {
        setNewClosestColors(сlosestColors(7, pickerColor?.hex))
    }, [pickerColor])

    // клик на предлагаемый цвет из 7 цветов
    function chooseNewColor(color) {
        setChoosedColor(color)
    }

    // закрытие модального окна
    function closeModalWindow() {
        handleModalWindow(false)
    }

    // нажажатие на копку apply
    function applyColor() {
        choosedColorFromPicker(choosedColor)
        handleModalWindow(false)
    }

    return (
        <div className='container'>
            <div className='modal-window'>
                <div className='modal-window__header'>
                    <button className='modal-window__button-close-modal-window icon-button' onClick={closeModalWindow}>
                        <i className='icon-close_modal icon'></i>
                    </button>
                </div>

                <div className='modal-window__palitra'>
                    <div className="modul-window__picker">
                        <ChromePicker
                            color={pickerColor}
                            onChange={color => setPickerColor(color)}
                            disableAlpha={true}
                            className="custom-chrome-picker"
                        />
                    </div>
                </div>

                <div className='modal-window__matching-block'>
                    <div className='modal-window__matching-block-title'>
                        <div className='modal-window__title title'>Matching Grout Colors</div>
                        <div className='modal-window__info'>
                            <i className='icon-info1 icon modal-window__info-icon'></i>
                            <div className='modal-windows__info-title'>
                                <span className='modal-windows__info-title-text'>Sample message you can see here!</span>
                            </div>
                        </div>

                    </div>

                    <div className='modal-window__matching-colors'>
                        {newClosestColors?.map(item => (
                            <div
                                className={`grout-color__user-palitra-block ${(choosedColor?.RGB === item?.color?.RGB) && 'grout-color__user-palitra-block_active'}`}
                                style={{ backgroundColor: `rgb(${item?.color?.RGB})` }}
                                key={item?.color?.colorNumber}
                                onClick={() => { chooseNewColor(item?.color) }}
                            />
                        ))}
                    </div>

                    <button className='modal-window__button button button_active' onClick={applyColor}>Apply</button>
                </div>
            </div>
        </div>
    )
}
