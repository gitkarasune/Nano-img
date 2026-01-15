
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex flex-col h-screen overflow-hidden bg-white dark:bg-black text-black dark:text-white relative is-home-page selection:bg-black/5 selection:dark:bg-white/10">

            <div className="lg:flex lg:justify-center lg:items-center">
                <h1 className="text-2xl font-semibold border-r border-gray-400 pr-4 mr-4 inline-block align-top h-[49px] leading-[49px]">
                    404
                </h1>
                <div className="inline-block">
                    <h2 className="text-sm font-normal m-0">This page could not be found.</h2>
                </div>
            </div>
            <div className="mt-8">
                <Link
                    href="/"
                    className="text-xs hover:underline transition-colors border border/50 rounded-lg"
                >
                    Return Home
                </Link>
            </div>
        </div>
    )
}
