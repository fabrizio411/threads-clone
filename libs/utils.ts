export const formatDateString = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }

    const date = new Date(dateString)
    const formattedDate = date.toLocaleDateString(undefined, options)

    const time = date.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit'
    })

    return `${time} - ${formattedDate}`
}