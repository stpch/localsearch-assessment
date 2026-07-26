import { FC, Suspense } from 'react'
import Skeleton from '@/components/skeleton'
import UsersTableLoader from './usersTableLoader'

interface Props {
    limit: number
    offset: number
}

const UsersTable: FC<Props> = props => (
    <Suspense
        fallback={
            <div className="flex h-full flex-col gap-4">
                <Skeleton className="h-15 rounded-lg" />
                <Skeleton className="h-full rounded-lg" />
            </div>
        }
    >
        <UsersTableLoader {...props} />
    </Suspense>
)

export default UsersTable
