import { getByPlaceholderText, render } from '@testing-library/react'
import Input from './input'

describe('Input', () => {
    test('renders input', async () => {
        const { container } = render(
            <Input className="foo" placeholder="Email address" type="email" />
        )

        const input = getByPlaceholderText(container, 'Email address')

        expect(input).toHaveClass('foo')
        expect(input).toHaveAttribute('type', 'email')
    })
})
