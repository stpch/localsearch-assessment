'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ReactNode, useEffect, useRef, useState, useTransition } from 'react'
import Button from '@/components/button'
import Input from '@/components/input'
import LoadingOverlay from '@/components/loadingOverlay'
import classNames from '@/lib/utils/classNames'
import debounce from '@/lib/utils/debounce'

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
    searchQuery?: string
    total: number
}

const DataTable = <T,>(props: Props<T>) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [searchQuery, setSearchQuery] = useState(props.searchQuery ?? '')
    const [pending, startTransition] = useTransition()
    const scrollAreaRef = useRef<HTMLDivElement>(null)

    const from = props.offset + 1
    const to = Math.min(props.offset + props.limit, props.total)

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = 0
        }
    }, [props.limit, props.offset])

    const updateSearchParams = (params: URLSearchParams) => {
        startTransition(() => {
            router.push(params.size ? `${pathname}?${params}` : pathname)
        })
    }

    const updateOffsetParam = (offset: number) => {
        const params = new URLSearchParams(searchParams)

        if (offset > 0) {
            params.set('offset', String(offset))
        } else {
            params.delete('offset')
        }

        updateSearchParams(params)
    }

    const updateSearchQueryParam = debounce((q: string) => {
        const params = new URLSearchParams(searchParams)

        if (q.length) {
            params.set('q', q)
        } else {
            params.delete('q')
        }

        params.delete('offset')

        updateSearchParams(params)
    }, 300)

    const onPreviousClick = () => {
        updateOffsetParam(Math.max(props.offset - props.limit, 0))
    }

    const onNextClick = () => {
        updateOffsetParam(props.offset + props.limit)
    }

    return (
        <div className="flex h-full flex-col gap-4">
            <Input
                name="q"
                onChange={e => {
                    setSearchQuery(e.currentTarget.value)
                    updateSearchQueryParam(e.currentTarget.value)
                }}
                placeholder="Search by name or email ..."
                value={searchQuery}
            />
            <div
                className={classNames(
                    'border-primary-light relative flex min-h-0 flex-1',
                    'flex-col overflow-hidden rounded-lg border-2',
                    'shadow-[0px_4px_14px_0px_rgba(0,0,0,0.05)]'
                )}
            >
                {!props.data.length && (
                    <div
                        className={classNames(
                            'absolute inset-0 z-10 flex items-center',
                            'justify-center text-3xl text-neutral-300',
                            'sm:text-4xl'
                        )}
                    >
                        No results
                    </div>
                )}
                <LoadingOverlay visible={pending} />
                <div
                    ref={scrollAreaRef}
                    className="min-h-0 flex-1 overflow-y-auto"
                >
                    <table className="w-full">
                        <thead>
                            <tr>
                                {props.columns.map(column => (
                                    <th
                                        key={String(column.accessor)}
                                        className={classNames(
                                            'bg-primary-light text-primary',
                                            'sticky top-0 z-20 px-4 py-2',
                                            'text-left text-nowrap'
                                        )}
                                    >
                                        {column.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {props.data.map(item => (
                                <tr
                                    key={item.id}
                                    className={classNames(
                                        'hover:bg-secondary-light/50',
                                        'bg-white/50 odd:bg-gray-100/50'
                                    )}
                                >
                                    {props.columns.map(column => (
                                        <td
                                            key={String(column.accessor)}
                                            className="px-4 py-1 text-left"
                                        >
                                            {item[column.accessor]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div
                    className={classNames(
                        'bg-primary-light relative z-20 flex flex-col',
                        'items-center justify-between gap-4 px-4 py-4',
                        'text-sm sm:flex-row sm:py-2'
                    )}
                >
                    <div>
                        {props.data.length > 0 &&
                            `${from} - ${to} / ${props.total}`}
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button
                            disabled={pending || props.offset <= 0}
                            onClick={onPreviousClick}
                            type="button"
                        >
                            Previous
                        </Button>
                        <Button
                            disabled={
                                pending ||
                                props.offset + props.limit >= props.total
                            }
                            onClick={onNextClick}
                            type="button"
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DataTable
