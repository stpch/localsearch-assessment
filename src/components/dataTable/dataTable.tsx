'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, ReactNode, useTransition } from 'react'
import { dataTableDefaultLimit, dataTableLimitOptions } from '@/lib/constants'

type Accessor<T> = {
    [K in keyof T]: T[K] extends ReactNode ? K : never
}[keyof T]

interface Column<T> {
    accessor: Accessor<T>
    label: string
}

type Item<T> = Record<Accessor<T>, ReactNode> & T & { id: number | string }

interface Props<T> {
    columns: Array<Column<T>>
    data: Array<Item<T>>
    limit: number
    offset: number
    total: number
}

const DataTable = <T,>(props: Props<T>) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [pending, startTransition] = useTransition()

    const from = props.offset + 1
    const to = Math.min(props.offset + props.limit, props.total)

    const updateSearchParams = (params: URLSearchParams) => {
        startTransition(() => {
            router.push(params.size ? `${pathname}?${params}` : pathname)
        })
    }

    const updateOffset = (offset: number) => {
        const params = new URLSearchParams(searchParams)

        if (offset > 0) {
            params.set('offset', String(offset))
        } else {
            params.delete('offset')
        }

        updateSearchParams(params)
    }

    const onLimitChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams)
        const limit = Number(event.target.value)

        if (limit === dataTableDefaultLimit) {
            params.delete('limit')
        } else {
            params.set('limit', String(limit))
        }

        params.delete('offset')

        updateSearchParams(params)
    }

    const onPreviousClick = () => {
        updateOffset(Math.max(props.offset - props.limit, 0))
    }

    const onNextClick = () => {
        updateOffset(props.offset + props.limit)
    }

    return (
        <table>
            <thead>
                <tr>
                    {props.columns.map(column => (
                        <th key={String(column.accessor)}>{column.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {props.data.map(item => (
                    <tr key={item.id}>
                        {props.columns.map(column => (
                            <td key={String(column.accessor)}>
                                {item[column.accessor]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={props.columns.length}>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <div>
                                {props.data.length > 0 &&
                                    `${from} - ${to} / ${props.total}`}
                            </div>
                            <div className="flex justify-center">
                                <select
                                    className="cursor-pointer disabled:opacity-50"
                                    disabled={pending}
                                    onChange={onLimitChange}
                                    value={props.limit}
                                >
                                    {dataTableLimitOptions.map(option => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    className="cursor-pointer disabled:opacity-50"
                                    disabled={pending || props.offset <= 0}
                                    onClick={onPreviousClick}
                                    type="button"
                                >
                                    Previous
                                </button>
                                <button
                                    className="cursor-pointer disabled:opacity-50"
                                    disabled={
                                        pending ||
                                        props.offset + props.limit >=
                                            props.total
                                    }
                                    onClick={onNextClick}
                                    type="button"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </td>
                </tr>
            </tfoot>
        </table>
    )
}

export default DataTable
