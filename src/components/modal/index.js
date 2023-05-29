import React, { useEffect, useState } from 'react'
import CustomColorPicker from '../picker'
import UserColorsBlock from '../colors-block'
import { сlosestColors } from "../../functions/closest_colors"
import { defaultColors } from './default-colors'
import './style.css'

export default function Modal({ close, change }) {
    const [pickerColor, setPickerColor] = useState('#000000')
    const [newClosestColors, setNewClosestColors] = useState([])
    const [choosedColor, setChoosedColor] = useState({ key: null, color: {} })
    const amountClosestColors = 7

    useEffect(() => {
        let currentColor = pickerColor?.hex || pickerColor
        setNewClosestColors(сlosestColors(defaultColors, amountClosestColors, currentColor))
    }, [pickerColor])

    function applyColor() {
        change(choosedColor?.color)
        close()
    }

    return (
        <div className='container'>
            <div className='modal-window'>
                <div className='modal-window__header'>
                    <button className='modal-window__button-close-modal-window icon-button' onClick={close}>
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
                        {newClosestColors?.map((item, index) => (
                            <UserColorsBlock
                                key={index}
                                color={item?.color}
                                choosedColor={choosedColor}
                                setChoosedColor={setChoosedColor}
                                keyIndex={index}
                            />
                        ))}
                    </div>

                    <button className='modal-window__button button button_active' onClick={applyColor}>Apply</button>
                </div>
            </div>
        </div>
    )
}
