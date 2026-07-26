import { render } from '@testing-library/react'
import LoadingOverlay from './loadingOverlay'

describe('LoadingOverlay', () => {
    test('hides overlay when not visible', async () => {
        const { container } = render(<LoadingOverlay />)
        expect(container.firstChild).toHaveClass('invisible', 'opacity-0')
    })

    test('shows overlay when visible', async () => {
        const { container } = render(<LoadingOverlay visible />)

        expect(container.firstChild).toHaveClass('opacity-100')
        expect(container.firstChild).not.toHaveClass('invisible')
    })

    test('applies CSS classes', async () => {
        const { container } = render(<LoadingOverlay className="foo bar" />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
