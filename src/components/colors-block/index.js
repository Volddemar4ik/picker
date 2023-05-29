import React from "react";

function UserColorsBlock({ color, choosedColor, setChoosedColor, keyIndex }) {
    function clickOnActiveBlock(rgbColor, key) {
        setChoosedColor(state => ({
            ...state,
            key: key,
            color: rgbColor
        }))
    }

    return (

        <div
            className={`grout-color__user-palitra-block ${((keyIndex === choosedColor?.key) && (color?.RGB === choosedColor?.color?.RGB)) && 'grout-color__user-palitra-block_active'}`}
            style={{ backgroundColor: `rgb(${color?.RGB})` }}
            onClick={() => clickOnActiveBlock(color, keyIndex)}
        />

    )
}

export default UserColorsBlock