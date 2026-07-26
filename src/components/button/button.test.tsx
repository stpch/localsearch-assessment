import { getByText, render } from '@testing-library/react'
import Button from './button'

describe('Button', () => {
    test('renders button', async () => {
        const { container } = render(
            <Button className="foo" type="submit">
                Foo
            </Button>
        )

        const button = getByText(container, 'Foo')

        expect(button).toHaveClass('foo')
        expect(button).toHaveAttribute('type', 'submit')
    })
})
