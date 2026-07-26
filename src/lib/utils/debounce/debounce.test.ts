import debounce from './debounce'

describe('debounce', () => {
    test('invokes callback only after the delay', async () => {
        const callback = jest.fn()
        const debounced = debounce(callback, 200)

        debounced()
        expect(callback).not.toHaveBeenCalled()

        jest.advanceTimersByTime(200)
        expect(callback).toHaveBeenCalledTimes(1)
    })

    test('collapses successive calls into single call', async () => {
        const callback = jest.fn()
        const debounced = debounce(callback, 200)

        debounced()
        jest.advanceTimersByTime(100)
        debounced()
        jest.advanceTimersByTime(100)
        debounced()
        jest.advanceTimersByTime(200)

        expect(callback).toHaveBeenCalledTimes(1)
    })

    test('forwards arguments of most recent call', async () => {
        const callback = jest.fn()
        const debounced = debounce(callback, 200)

        debounced('foo')
        debounced('bar')
        jest.advanceTimersByTime(200)

        expect(callback).toHaveBeenCalledWith('bar')
    })
})
