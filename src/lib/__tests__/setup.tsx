// istanbul ignore file
import '@testing-library/jest-dom'

beforeEach(() => {
    jest.useFakeTimers()

    // Workaround for a bug in @sinonjs/fake-timers 15.2.0: clearTimeout called
    // before setTimeout initializes clock.timers without clock.timerHeap, which
    // causes subsequent setTimeout calls to crash. Scheduling a no-op timer
    // first ensures both are initialized together, then clear it immediately.
    setTimeout(() => {}, 0)
    jest.clearAllTimers()
})

afterEach(() => {
    jest.clearAllTimers()
    jest.useRealTimers()

    window.localStorage.clear()
    document.title = ''
})
