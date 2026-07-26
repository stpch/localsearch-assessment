import { FC } from 'react'
import classNames from '@/lib/utils/classNames'

interface Props {
    className?: string
}

const Skeleton: FC<Props> = props => (
    <div className={classNames('animate-pulse bg-gray-100', props.className)} />
)

export default Skeleton
