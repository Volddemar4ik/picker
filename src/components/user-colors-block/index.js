import React, { useState } from "react"

function UserColors({ array, setColor }) {
    const [choosedColor, setChoosedColor] = useState(undefined)

    let newArray = []
    if (array[0]?.color) {
        array?.map(item => (
            newArray.push(item?.color)
        ))
    } else {
        newArray = [...array]
    }

    function clickOnActiveBlock(item) {
        if (setColor) {
            setChoosedColor(item?.RGB)
            setColor(item)
        } else {
            setChoosedColor(item?.RGB)
        }
    }

    return (
        <>
            {newArray?.map(item => (
                <div
                    className={`grout-color__user-palitra-block ${(item?.RGB === choosedColor) && 'grout-color__user-palitra-block_active'}`}
                    style={{ backgroundColor: `rgb(${item?.RGB})` }}
                    key={item?.RGB}
                    onClick={() => clickOnActiveBlock(item)}
                />
            ))}
        </>
    )
}

export default UserColors