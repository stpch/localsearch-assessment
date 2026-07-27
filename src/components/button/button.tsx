import { ComponentProps, FC } from 'react'
import classNames from '@/lib/utils/classNames'

type Props = ComponentProps<'button'>

const Button: FC<Props> = props => (
    <button
        {...props}
        className={classNames(
            'text-primary bg-primary/10 hover:bg-primary inline-flex min-w-24',
            'cursor-pointer items-center justify-center rounded-full px-4 py-1',
            'text-base font-semibold tracking-wide transition-colors',
            'hover:text-white disabled:pointer-events-none disabled:opacity-50',
            props.className
        )}
    />
)

export default Button
