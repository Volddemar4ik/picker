import { useState } from "react"
import { ChromePicker } from "react-color"
import { сlosestColors } from "../functions"
import './style.css'


export default function Modal({ active, setActive, setColor }) {
    const [choosedColor, setChoosedColor] = useState('')
    const [selectedBlock, setSelectedBlock] = useState(null)
    const [currenColor, setCurrentColor] = useState('#000000')
    const [newColors, setNewColors] = useState('')

    const colors = [
        { id: 'closest-color-01', itemId: 0, bgColor: newColors[0]?.color?.RGB },
        { id: 'closest-color-02', itemId: 1, bgColor: newColors[1]?.color?.RGB }
    ]

    const handleOnChange = color => {
        setCurrentColor(color)
        setNewColors(сlosestColors(color?.hex))
    }

    const handleBlockClick = blockId => {
        setSelectedBlock(blockId)
    }

    function handleNewColor(item, selectedBlock) {
        if (newColors) {
            handleBlockClick(selectedBlock)
            setChoosedColor(newColors[item].color)
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
                        {colors?.map(item => (<div
                            className={`${(selectedBlock === item.id) && 'main-block__select-color-item_active'} main-block__select-color-item`} onClick={() => handleNewColor(item.itemId, item.id)} key={item.id} style={{ backgroundColor: `rgb(${item.bgColor})` }}>
                        </div>))}
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