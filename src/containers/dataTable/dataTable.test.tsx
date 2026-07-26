import {
    fireEvent,
    getByText,
    queryByText,
    render,
} from '@testing-library/react'
import { router } from '@/lib/__tests__/__mocks__/next/navigation'
import DataTable from './dataTable'

describe('DataTable', () => {
    test('renders data', async () => {
        const { container } = render(
            <DataTable
                columns={[{ accessor: 'name', label: 'Name' }]}
                data={[
                    { id: 1, name: 'Foo' },
                    { id: 2, name: 'Bar' },
                ]}
                limit={10}
                offset={0}
                total={2}
            />
        )

        getByText(container, 'Foo')
        getByText(container, 'Bar')
    })

    describe('renders pagination correctly when', () => {
        test('on first page', async () => {
            const { container } = render(
                <DataTable
                    columns={[{ accessor: 'name', label: 'Name' }]}
                    data={[
                        { id: 1, name: 'Foo' },
                        { id: 2, name: 'Bar' },
                    ]}
                    limit={2}
                    offset={0}
                    total={6}
                />
            )

            getByText(container, '1 - 2 / 6')
            expect(getByText(container, 'Previous')).toBeDisabled()
            expect(getByText(container, 'Next')).not.toBeDisabled()
        })

        test('on middle page', async () => {
            const { container } = render(
                <DataTable
                    columns={[{ accessor: 'name', label: 'Name' }]}
                    data={[
                        { id: 3, name: 'Foo' },
                        { id: 4, name: 'Bar' },
                    ]}
                    limit={2}
                    offset={2}
                    total={6}
                />
            )

            getByText(container, '3 - 4 / 6')
            expect(getByText(container, 'Previous')).not.toBeDisabled()
            expect(getByText(container, 'Next')).not.toBeDisabled()
        })

        test('on last page', async () => {
            const { container } = render(
                <DataTable
                    columns={[{ accessor: 'name', label: 'Name' }]}
                    data={[
                        { id: 5, name: 'Foo' },
                        { id: 6, name: 'Bar' },
                    ]}
                    limit={2}
                    offset={4}
                    total={6}
                />
            )

            getByText(container, '5 - 6 / 6')
            expect(getByText(container, 'Previous')).not.toBeDisabled()
            expect(getByText(container, 'Next')).toBeDisabled()
        })
    })

    describe('no results overlay', () => {
        test('is rendered when no data', async () => {
            const { container } = render(
                <DataTable<{ name: string }>
                    columns={[{ accessor: 'name', label: 'Name' }]}
                    data={[]}
                    limit={2}
                    offset={0}
                    total={0}
                />
            )

            getByText(container, 'No results')
            expect(getByText(container, 'Previous')).toBeDisabled()
            expect(getByText(container, 'Next')).toBeDisabled()
        })

        test('is not rendered when data', async () => {
            const { container } = render(
                <DataTable
                    columns={[{ accessor: 'name', label: 'Name' }]}
                    data={[
                        { id: 1, name: 'Foo' },
                        { id: 2, name: 'Bar' },
                    ]}
                    limit={2}
                    offset={0}
                    total={6}
                />
            )

            expect(queryByText(container, 'No results')).toBeNull()
        })
    })

    describe('previous button', () => {
        test('does nothing on first page', async () => {
            const { container } = render(
                <DataTable
                    columns={[{ accessor: 'name', label: 'Name' }]}
                    data={[
                        { id: 1, name: 'Foo' },
                        { id: 2, name: 'Bar' },
                    ]}
                    limit={2}
                    offset={0}
                    total={6}
                />
            )

            fireEvent.click(getByText(container, 'Previous'))

            expect(router.push).not.toHaveBeenCalled()
        })

        test('navigates back from second page', async () => {
            const { container } = render(
                <DataTable
                    columns={[{ accessor: 'name', label: 'Name' }]}
                    data={[
                        { id: 3, name: 'Foo' },
                        { id: 4, name: 'Bar' },
                    ]}
                    limit={2}
                    offset={2}
                    total={6}
                />
            )

            fireEvent.click(getByText(container, 'Previous'))

            expect(router.push).toHaveBeenCalledWith('/')
        })

        test('navigates back from last page', async () => {
            const { container } = render(
                <DataTable
                    columns={[{ accessor: 'name', label: 'Name' }]}
                    data={[
                        { id: 5, name: 'Foo' },
                        { id: 6, name: 'Bar' },
                    ]}
                    limit={2}
                    offset={4}
                    total={6}
                />
            )

            fireEvent.click(getByText(container, 'Previous'))

            expect(router.push).toHaveBeenCalledWith('/?offset=2')
        })
    })

    describe('next button', () => {
        test('navigates forward from first page', async () => {
            const { container } = render(
                <DataTable
                    columns={[{ accessor: 'name', label: 'Name' }]}
                    data={[
                        { id: 1, name: 'Foo' },
                        { id: 2, name: 'Bar' },
                    ]}
                    limit={2}
                    offset={0}
                    total={6}
                />
            )

            fireEvent.click(getByText(container, 'Next'))

            expect(router.push).toHaveBeenCalledWith('/?offset=2')
        })

        test('navigates forward from second-last page', async () => {
            const { container } = render(
                <DataTable
                    columns={[{ accessor: 'name', label: 'Name' }]}
                    data={[
                        { id: 3, name: 'Foo' },
                        { id: 4, name: 'Bar' },
                    ]}
                    limit={2}
                    offset={2}
                    total={6}
                />
            )

            fireEvent.click(getByText(container, 'Next'))

            expect(router.push).toHaveBeenCalledWith('/?offset=4')
        })

        test('does nothing on last page', async () => {
            const { container } = render(
                <DataTable
                    columns={[{ accessor: 'name', label: 'Name' }]}
                    data={[
                        { id: 5, name: 'Foo' },
                        { id: 6, name: 'Bar' },
                    ]}
                    limit={2}
                    offset={4}
                    total={6}
                />
            )

            fireEvent.click(getByText(container, 'Next'))

            expect(router.push).not.toHaveBeenCalled()
        })
    })
})
