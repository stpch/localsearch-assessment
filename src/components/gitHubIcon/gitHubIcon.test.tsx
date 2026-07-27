import { render } from '@testing-library/react'
import GitHubIcon from './gitHubIcon'

describe('GitHubIcon', () => {
    test('applies CSS classes', async () => {
        const { container } = render(<GitHubIcon className="foo bar" />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
