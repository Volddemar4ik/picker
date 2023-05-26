import React, { useState, useEffect } from 'react'
import { CustomPicker } from 'react-color'
import tinycolor from "tinycolor2"
import './style.css'

const { Saturation, Hue } = require('react-color/lib/components/common')

const CustomSlider = (sliderColor) => {
    return (
        <div className='slider-ring' style={{ background: sliderColor.hex }} />
    )
}

const CustomPointer = (pointerColor) => {
    return (
        <div className='pointer-ring' style={{ background: pointerColor.hex }} />
    )
}

const CustomColorPicker = (props) => {
    const [hsl, setHSL] = useState({ h: 0, s: 0, l: 0 })
    const [hsv, setHSV] = useState({ h: 0, s: 0, v: 0 })
    console.log('props', props)

    useEffect(() => {
        const color = tinycolor(props.hexCode)
        setHSV(color.toHsv())
        setHSL(color.toHsl())
    }, [props.hexCode])

    const handleHueChange = (hue) => {
        setHSL(hue)

        // const color = tinycolor(hsv)
        // console.log('color', color)
    }

    const handleSaturationChange = (hsv) => {
        setHSV(hsv)
        const color = tinycolor(hsv)
        props.onChange(color.toHex())
    }

    return (
        <div className='custom-picker'>
            <div className='custom-picker__saturation-block'>
                <Saturation
                    hsl={hsl}
                    hsv={hsv}
                    pointer={() => <CustomPointer hex={props?.hex} />}
                    onChange={handleSaturationChange}
                />
            </div>

            <div className='custom-picker__hue-block'>
                <div className='custom-picker__hue-block-pipette' >
                    <button className='custom-picker__hue-block-button icon-button'>
                        <i className='icon-pipette icon'></i>
                    </button>
                </div>

                <div className='custom-picker__hue-block-hue'>
                    <Hue
                        hsl={hsl}
                        pointer={() => <CustomSlider hex={props?.hex} />}
                        onChange={handleHueChange}
                        direction={'horizontal'}
                    />
                </div>
            </div>
        </div>
    )
}

export default CustomPicker(CustomColorPicker)