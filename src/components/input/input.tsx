import { ComponentProps, FC } from 'react'
import classNames from '@/lib/utils/classNames'

type Props = ComponentProps<'input'>

const Input: FC<Props> = props => (
    <input
        {...props}
        className={classNames(
            'w-full rounded-lg bg-white p-4 text-base tracking-wide',
            'text-neutral-700 ring-1 ring-neutral-300 transition-shadow',
            'duration-200 ease-out outline-none placeholder:text-neutral-500',
            'focus:ring-2 disabled:pointer-events-none disabled:opacity-50',
            props.className
        )}
    />
)

export default Input
