export function getRandomElements(count, arrayOfColors) {
    const copyDefaultColors = [...arrayOfColors]
    let arrayLength = arrayOfColors.length
    const result = []

    while (arrayLength-- && result.length < count) {
        const index = Math.floor((arrayLength + 1) * Math.random())

        const temp = copyDefaultColors[index]
        copyDefaultColors[index] = copyDefaultColors[arrayLength]
        copyDefaultColors[arrayLength] = temp
        result.push(temp)
    }

    return result
}