
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-4">
            <h1 className="text-2xl font-semibold border-r border-gray-400 pr-4 mr-4 inline-block align-top h-[49px] leading-[49px]">
                404
            </h1>
            <div className="inline-block align-top h-[49px] leading-[49px]">
                <h2 className="text-sm font-normal m-0">This page could not be found.</h2>
            </div>
            <div className="mt-8">
                <Link
                    href="/"
                    className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors"
                >
                    Return Home
                </Link>
            </div>
        </div>
    )
}
