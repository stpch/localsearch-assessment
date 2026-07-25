// istanbul ignore file
import '@/lib/db'
import UsersTable from '@/containers/usersTable'
import { dataTableDefaultLimit } from '@/lib/constants'

interface Props {
    searchParams: Promise<Record<string, string | string[] | undefined>>
}

const HomePage = async (props: Props) => {
    const searchParams = await props.searchParams
    const limit = Number(searchParams.limit) || dataTableDefaultLimit
    const offset = Number(searchParams.offset) || 0

    return <UsersTable limit={limit} offset={offset} />
}

export default HomePage
