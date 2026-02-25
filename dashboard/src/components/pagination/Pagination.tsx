import { useState, type JSX } from "react"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../ui/pagination"

const data = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
}))
const PaginationComp=({ className, ...props }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>): JSX.Element => {
    const ITEMS_PER_PAGE = 5
    const [currentPage, setCurrentPage] = useState<number>(1)

    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE

    const currentData = data.slice(startIndex, endIndex)
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    return (
    <>
            <div className="space-y-2">
                {currentData.map(item => (
                    <div key={item.id} className="border p-2 rounded">
                        {item.name}
                    </div>
                ))}
            </div>
            <Pagination>
                <PaginationContent>

                    {/* Previous */}
                    <PaginationItem>
                        <PaginationPrevious
                            size="default"
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                setCurrentPage(p => Math.max(p - 1, 1))
                            }}
                        />
                    </PaginationItem>

                    {/* Page Numbers */}
                    {pages.map(page => (
                        <PaginationItem key={page}>
                            <PaginationLink
                                size="default"
                                href="#"
                                isActive={currentPage === page}
                                onClick={(e) => {
                                    e.preventDefault()
                                    setCurrentPage(page)
                                }}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    {/* Next */}
                    <PaginationItem>
                        <PaginationNext
                            size="default"
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                setCurrentPage(p => Math.min(p + 1, totalPages))
                            }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

    </>
  )
}

export default PaginationComp



