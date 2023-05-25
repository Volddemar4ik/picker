export function getRandomElements(count, array) {
    const copyDefaultColors = array.slice()
    let arrayLength = array.length
    const result = []

    while (arrayLength-- && result.length < count) {
        const index = Math.floor((arrayLength + 1) * Math.random()); // Генерируем случайный индекс
        const temp = copyDefaultColors[index]; // Обмен элементами
        copyDefaultColors[index] = copyDefaultColors[arrayLength];
        copyDefaultColors[arrayLength] = temp;
        result.push(temp); // Добавляем выбранный элемент в результат
    }

    return result;
}