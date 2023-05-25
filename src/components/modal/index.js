import React, { useContext, useEffect, useState } from 'react'
import { ChromePicker } from "react-color"
import { ModalWindow } from '../../App'
import UserColors from '../user_colors_block'
import { сlosestColors } from "../functions/closest_colors"
import { defaultColors } from './default_colors'
import './style.css'

export default function Modal() {
    const [handleModalWindow, choosedColorFromPicker] = useContext(ModalWindow)
    const [pickerColor, setPickerColor] = useState('#FFFFFF')
    const [newClosestColors, setNewClosestColors] = useState([])
    const [choosedColor, setChoosedColor] = useState(undefined)

    // отслеживаем изменение цвета picker
    useEffect(() => {
        setNewClosestColors(сlosestColors(defaultColors, 7, pickerColor?.hex))
    }, [pickerColor])

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
                        <UserColors array={newClosestColors} setColor={setChoosedColor} />
                    </div>

                    <button className='modal-window__button button button_active' onClick={applyColor}>Apply</button>
                </div>
            </div>
        </div>
    )
}
