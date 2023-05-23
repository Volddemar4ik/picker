import { useState } from "react"
import { defaultColors } from "./default_colors"
import { ChromePicker } from "react-color"

export default function Modal({ active, setActive, setColor }) {
    const [usedColor, setUsedColor] = useState('#000000')
    const [choosedColor, setChoosedColor] = useState('')
    const [selectedBlock, setSelectedBlock] = useState(null)

    // custom picker
    const [currenColor, setCurrentColor] = useState('#000')
    const handleOnChange = color => {
        setCurrentColor(color)
        setUsedColor(color.hex)
        findClosestColors(color.hex)
    }

    const handleBlockClick = (blockId) => {
        setSelectedBlock(blockId)
    }

    // standart picker
    // const handleSetColor = event => {
    //     const selectedColor = event.target.value
    //     setUsedColor(selectedColor)
    //     findClosestColors(selectedColor)
    // }

    // hex to rgb function
    const hexToRGB = hex => {
        const shortHexRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
        const longHexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i
        const result = longHexRegex.exec(hex) || shortHexRegex.exec(hex)

        return result
            ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
            }
            : null
    }

    // color's vectors
    const colorDistance = (color1, color2) => {
        const components = color1.split(',')
        const deltaR = parseInt(components[0]) - color2.r
        const deltaG = parseInt(components[1]) - color2.g
        const deltaB = parseInt(components[2]) - color2.b

        return Math.sqrt(deltaR * deltaR + deltaG * deltaG + deltaB * deltaB)
    }

    // function closest colors
    const findClosestColors = color => {
        const selectedColorRGB = hexToRGB(color)

        const closestColors = defaultColors
            .map((colorObj) => ({
                color: colorObj,
                distance: colorDistance(colorObj.RGB, selectedColorRGB),
            }))
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 2)

        const closestColor01 = document.getElementById('closest-color-01')
        if (closestColor01) {
            closestColor01.style.backgroundColor = `rgb(${closestColors[0].color.RGB})`
            closestColor01.addEventListener('click', function () {
                handleBlockClick('closest-color-01')
                setChoosedColor(closestColors[0].color)
            })
        }

        const closestColor02 = document.getElementById('closest-color-02')
        if (closestColor02) {
            closestColor02.style.backgroundColor = `rgb(${closestColors[1].color.RGB})`
            closestColor02.addEventListener('click', function () {
                handleBlockClick('closest-color-02')
                setChoosedColor(closestColors[1].color)
            })
        }
    }

    function selectColor() {
        console.log('choosedColor', choosedColor)
        if (choosedColor.RGB) {
            setColor(choosedColor)
            setActive(false)
        }
    }

    return (
        <div className={active
            ? "custom-grout-color-block__modul-window-show"
            : "custom-grout-color-block__modul-window"}>
            <div className=" modul-window">
                <div className="modul-window__header">
                    <span className="icon-clear" onClick={() => setActive(false)}></span>
                </div>

                <div className="modul-window__picker">
                    {/* <input type='color' className='modul-window__picker-window' onChange={handleSetColor} /> */}
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
                            className={`${(selectedBlock === 'closest-color-01') && 'main-block__select-color-item_active'} main-block__select-color-item`} id="closest-color-01">
                        </div>
                        <div
                            className={`${(selectedBlock === 'closest-color-02') && 'main-block__select-color-item_active'} main-block__select-color-item`} id="closest-color-02">
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