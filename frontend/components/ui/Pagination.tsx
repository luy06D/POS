import Link from "next/link"


export default function Pagination({ page, totalPage }: { page: number, totalPage: number }) {

    const pages = Array.from({ length: totalPage }, (_, i) => i + 1)
    return (
        <nav className="flex justify-center py-10">
            {page > 1 && (
                <Link
                    className="px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-"
                    href={`/admin/product?page=${page - 1}`}
                >&laquo;</Link>
            )}


            {pages.map(currentPage => (
                <Link
                    key={currentPage}
                    href={`/admin/product?page=${currentPage}`}
                    className={`${page === currentPage && 'font-black bg-green-500 text-white'} px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
                >{currentPage}</Link>
            ))}

            {totalPage > page && (
                <Link
                    className="px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-"
                    href={`/admin/product?page=${page + 1}`}
                >&raquo;</Link>
            )}



        </nav>
    )
}
