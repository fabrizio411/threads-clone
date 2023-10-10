export const formatDateString = (dateString: string) => {
    let result
    let unit
    const oneDayTime = 86400000;
    const oneHourTime = oneDayTime / 24
    const oneMinuteTime = oneHourTime / 60
    const oneWeekTime = oneDayTime * 7;
    const oneYearTime = 365 * 24 * 60 * 60 * 1000;

    const date = new Date(dateString)
    const actualDate = new Date()
    const dateDiff = actualDate.getTime() - date.getTime()

    if (dateDiff < oneMinuteTime) {
        result = null
        unit = 'now'
    } else if (dateDiff < oneHourTime) {
        result = Math.round((dateDiff) / (1000 * 60))
        unit = 'm'
    } else if (dateDiff < oneDayTime) {
        result = Math.round((dateDiff) / (1000 * 60 * 60))
        unit = 'h'
    } else if (dateDiff < oneWeekTime) {
        result = Math.round((dateDiff) / (1000 * 60 * 60 * 24))
        unit = 'd'
    } else if (dateDiff < oneYearTime) {
        result = Math.round((dateDiff) / (1000 * 60 * 60 * 24 * 7))
        unit = 'w'
    } else {
        result = actualDate.getFullYear()
        unit = ''
    } 

    return `${result || ''}${unit}`
}



export const isBase64Image = (imageData: string) => {
    const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/
    return base64Regex.test(imageData)
}