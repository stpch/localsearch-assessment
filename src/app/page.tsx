// istanbul ignore file
import GitHubIcon from '@/components/gitHubIcon'
import UserTable from '@/containers/userTable'
import { SearchParams } from '@/lib/types'
import classNames from '@/lib/utils/classNames'
import parseQueryParams from '@/lib/utils/parseQueryParams'

interface Props {
    searchParams: Promise<SearchParams>
}

const HomePage = async (props: Props) => {
    const queryParams = parseQueryParams(await props.searchParams)

    return (
        <div className="flex h-dvh flex-col gap-8 p-8 sm:p-16">
            <header className="flex flex-col items-center gap-2">
                <h1
                    className={classNames(
                        'text-primary w-min text-center text-4xl font-semibold',
                        'sm:w-auto sm:text-5xl'
                    )}
                >
                    localsearch assessment
                </h1>
                <h2
                    className={classNames(
                        'text-secondary text-center text-2xl font-semibold',
                        'sm:text-3xl'
                    )}
                >
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
                <UserTable {...queryParams} />
            </main>
        </div>
    )
}

export default HomePage
