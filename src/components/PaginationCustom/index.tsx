import { ButtonGroup, IconButton, Pagination } from '@chakra-ui/react'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'

export const PaginationCustom = ({
    currentPage,
    totalItems,
    pageSize,
    onPageChange
}: {
    currentPage: number,
    totalItems: number,
    pageSize: number,
    onPageChange: (page: number) => void
}) => {
    return (
        <Pagination.Root
            count={totalItems}
            pageSize={pageSize}
            page={currentPage}
            onChange={(page) => onPageChange(page)}
        >
            <ButtonGroup variant="ghost" size="sm" wrap="wrap">
                <Pagination.PrevTrigger asChild>
                    <IconButton
                        aria-label="Anterior"
                        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                    >
                        <LuChevronLeft />
                    </IconButton>
                </Pagination.PrevTrigger>

                <Pagination.Items
                    render={(page) => (
                        <IconButton
                            key={page.value}
                            aria-label={`Página ${page.value}`}
                            onClick={() => onPageChange(page.value)}
                            variant={page.value === currentPage ? "outline" : "ghost"}
                        >
                            {page.value}
                        </IconButton>
                    )}
                />

                <Pagination.NextTrigger asChild>
                    <IconButton
                        aria-label="Siguiente"
                        onClick={() => onPageChange(currentPage + 1)}>
                        <LuChevronRight />
                    </IconButton>
                </Pagination.NextTrigger>
            </ButtonGroup>
        </Pagination.Root>
    );
};
