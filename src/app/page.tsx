// istanbul ignore file
import '@/lib/db'
import GitHubIcon from '@/components/gitHubIcon'
import UsersTable from '@/containers/usersTable'
import classNames from '@/lib/utils/classNames'

interface Props {
    searchParams: Promise<Record<string, string | string[] | undefined>>
}

const HomePage = async (props: Props) => {
    const searchParams = await props.searchParams
    const offset = Number(searchParams.offset) || 0
    const searchQuery =
        typeof searchParams.q === 'string' ? searchParams.q : undefined

    return (
        <div className="flex h-dvh flex-col gap-8 p-8 sm:p-16">
            <header className="flex flex-col gap-2">
                <h1 className="text-primary text-center text-4xl font-semibold sm:text-5xl">
                    localsearch assessment
                </h1>
                <h2 className="text-secondary text-center text-2xl font-semibold sm:text-3xl">
                    User data table
                </h2>
                <a
                    className={classNames(
                        'hover:text-secondary absolute top-4 right-8 w-8',
                        'opacity-40 transition-[color,opacity]',
                        'hover:opacity-100 sm:right-16'
                    )}
                    href="https://github.com/stpch/localsearch-assessment"
                >
                    <GitHubIcon />
                </a>
            </header>
            <main className="min-h-0 flex-1">
                <UsersTable
                    limit={100}
                    offset={offset}
                    searchQuery={searchQuery}
                />
            </main>
        </div>
    )
}

export default HomePage
