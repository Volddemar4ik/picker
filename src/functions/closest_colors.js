export const hexToRGB = hex => {
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

export const colorDistance = (color1, color2) => {
    const components = color1.split(',')
    const deltaR = parseInt(components[0]) - color2?.r
    const deltaG = parseInt(components[1]) - color2?.g
    const deltaB = parseInt(components[2]) - color2?.b

    return Math.sqrt(deltaR * deltaR + deltaG * deltaG + deltaB * deltaB)
}

export const сlosestColors = (arrayOfColors, amountOfColors, color) => {
    const selectedColorRGB = hexToRGB(color)

    const closestColors = arrayOfColors
        .map(item => ({
            color: item,
            distance: colorDistance(item.RGB, selectedColorRGB),
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, amountOfColors)

    return closestColors
}