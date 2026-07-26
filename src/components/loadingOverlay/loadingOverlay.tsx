import { FC } from 'react'
import classNames from '@/lib/utils/classNames'

interface Props {
    className?: string
    visible?: boolean
}

const LoadingOverlay: FC<Props> = props => (
    <div
        className={classNames(
            'absolute inset-0 z-10 flex items-center justify-center',
            'bg-white/75 transition-[opacity,visibility] duration-200 ease-out',
            props.visible ? 'opacity-100' : 'invisible opacity-0',
            props.className
        )}
    >
        <svg
            className="text-primary size-9 animate-spin"
            fill="none"
            stroke="currentColor"
            strokeWidth={5}
            viewBox="0 0 38 38"
        >
            <circle cx="19" cy="19" r="16" strokeOpacity={0.25} />
            <path d="M35 19c0-8.837-7.163-16-16-16" strokeLinecap="round" />
        </svg>
    </div>
)

export default LoadingOverlay
