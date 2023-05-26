import React, { useState } from "react";

function UserColors({ array, setColor }) {
    const [choosedColor, setChoosedColor] = useState(undefined)
    const [coosedColorIndex, setChoosedColorIndex] = useState(null)

    let newArray = []
    if (array[0]?.color) {
        array?.map(item => (
            newArray.push(item?.color)
        ))
    } else {
        newArray = [...array]
    }

    function clickOnActiveBlock(itemBlock) {
        setChoosedColorIndex(itemBlock?.index)

        if (setColor) {
            setChoosedColor(itemBlock?.item?.RGB)
            setColor(itemBlock?.item)
        } else {
            setChoosedColor(itemBlock?.item?.RGB)
        }
    }

    return (
        <>
            {newArray?.map((item, index) => (
                <div
                    className={`grout-color__user-palitra-block ${((index === coosedColorIndex) && (item?.RGB === choosedColor)) && 'grout-color__user-palitra-block_active'}`}
                    style={{ backgroundColor: `rgb(${item?.RGB})` }}
                    key={index}
                    onClick={() => clickOnActiveBlock({ item, index })}
                />
            ))}
        </>
    )
}

export default UserColors