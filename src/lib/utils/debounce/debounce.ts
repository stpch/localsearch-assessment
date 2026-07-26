const debounce = <Args extends unknown[]>(
    callback: (...args: Args) => void,
    delay: number
) => {
    let timeout: ReturnType<typeof setTimeout> | undefined

    return (...args: Args) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => callback(...args), delay)
    }
}

export default debounce
