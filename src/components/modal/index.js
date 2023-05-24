import { useState, useRef, useEffect } from "react"
import { ChromePicker } from "react-color"
import { сlosestColors } from "../functions"
import './style.css'


export default function Modal({ active, setActive, setColor }) {
    const [choosedColor, setChoosedColor] = useState('')
    const [selectedBlock, setSelectedBlock] = useState(null)
    const [currenColor, setCurrentColor] = useState('#000000')
    const [newColors, setNewColors] = useState('')
    const newColor01 = useRef(null)
    const newColor02 = useRef(null)

    const handleOnChange = color => {
        setCurrentColor(color)
        setNewColors(сlosestColors(color?.hex))
    }

    const handleBlockClick = blockId => {
        setSelectedBlock(blockId)
    }

    useEffect(() => {
        newColor01.current.style.backgroundColor = `rgb(${newColors[0]?.color.RGB})`
        newColor02.current.style.backgroundColor = `rgb(${newColors[1]?.color.RGB})`
    }, [newColors])

    function handleNewColor01() {
        if (newColors) {
            handleBlockClick('closest-color-01')
            setChoosedColor(newColors[0].color)
        }
    }

    function handleNewColor02() {
        if (newColors) {
            handleBlockClick('closest-color-02')
            setChoosedColor(newColors[1].color)
        }
    }

    function selectColor() {
        if (choosedColor.RGB) {
            setColor(choosedColor)
            setActive(false)
        }
    }

    return (
        <div className={active
            ? "custom-grout-color-block__modul-window-show"
            : "custom-grout-color-block__modul-window"}>
            <div className="modul-window">
                <div className="modul-window__header">
                    <span className="icon-clear" onClick={() => setActive(false)}></span>
                </div>

                <div className="modul-window__picker">
                    <ChromePicker
                        color={currenColor}
                        onChange={handleOnChange}
                        disableAlpha={true}
                        className="custom-chrome-picker"
                    />
                </div>

                <div className="modul-window__closest-grout-color">
                    <div className="modul-window__title title">Matching Grout Colors</div>

                    <div className="grout-color-block__select-colors">
                        <div
                            className={`${(selectedBlock === 'closest-color-01') && 'main-block__select-color-item_active'} main-block__select-color-item`} ref={newColor01} onClick={handleNewColor01}>
                        </div>
                        <div
                            className={`${(selectedBlock === 'closest-color-02') && 'main-block__select-color-item_active'} main-block__select-color-item`} ref={newColor02} onClick={handleNewColor02}>
                        </div>
                    </div>
                </div>

                <div className="modul-window__action-zone">
                    <div className="modul-window__button">
                        <button className="modul-window__upload-button button button_active" onClick={selectColor}>Apply</button>
                    </div>
                </div>
            </div>
        </div>
    )
}