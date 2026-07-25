import { fireEvent, getByRole, getByText, render } from '@testing-library/react'
import { router } from '@/lib/__tests__/__mocks__/next/navigation'
import { dataTableDefaultLimit } from '@/lib/constants'
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

    describe('limit select', () => {
        test('updates limit search param when non-default option', async () => {
            const { container } = render(
                <DataTable
                    columns={[]}
                    data={[]}
                    limit={0}
                    offset={0}
                    total={0}
                />
            )

            fireEvent.change(getByRole(container, 'combobox'), {
                target: { value: 50 },
            })

            expect(router.push).toHaveBeenCalledWith('/?limit=50')
        })

        test('removes limit search param when default option', async () => {
            const { container } = render(
                <DataTable
                    columns={[]}
                    data={[]}
                    limit={0}
                    offset={0}
                    total={0}
                />
            )

            fireEvent.change(getByRole(container, 'combobox'), {
                target: { value: dataTableDefaultLimit },
            })

            expect(router.push).toHaveBeenCalledWith('/')
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
