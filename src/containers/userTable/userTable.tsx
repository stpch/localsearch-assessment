// istanbul ignore file
import { FC, Suspense } from 'react'
import Skeleton from '@/components/skeleton'
import UserTableLoader from './userTableLoader'

interface Props {
    limit: number
    offset: number
    searchQuery?: string
}

const UserTable: FC<Props> = props => (
    <Suspense
        fallback={
            <div className="flex h-full flex-col gap-4">
                <Skeleton className="h-15 rounded-lg" />
                <Skeleton className="h-full rounded-lg" />
            </div>
        }
    >
        <UserTableLoader {...props} />
    </Suspense>
)

export default UserTable
