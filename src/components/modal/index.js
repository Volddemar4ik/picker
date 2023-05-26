import React, { useContext, useEffect, useState } from 'react'
import CustomColorPicker from '../picker'
import { ModalWindow } from '../../App'
import UserColors from '../user-colors-block'
import { сlosestColors } from "../../functions/closest_colors"
import { defaultColors } from './default-colors'
import './style.css'

export default function Modal() {
    const [handleModalWindow, choosedColorFromPicker] = useContext(ModalWindow)
    const [pickerColor, setPickerColor] = useState('#000000')
    const [newClosestColors, setNewClosestColors] = useState([])
    const [choosedColor, setChoosedColor] = useState(undefined)
    console.log('pickerColor', pickerColor)

    useEffect(() => {
        setNewClosestColors(сlosestColors(defaultColors, 7, pickerColor?.hex))
    }, [pickerColor])

    function closeModalWindow() {
        handleModalWindow(false)
    }

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
                    <CustomColorPicker
                        color={pickerColor}
                        onChange={color => setPickerColor(color)}
                    />


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
