import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useTaskContext } from '@/contextApis/task';

export default function TaskPagination({
  totalNumberOfRecords,
}: {
  totalNumberOfRecords: number;
}) {
  const { pagination, setPagination } = useTaskContext();
  const totalPages = Math.ceil(totalNumberOfRecords / pagination.pageSize);
  if (totalPages <= 1) return null;

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        {pagination.page > 1 && (
          <PaginationItem>
            <PaginationPrevious
              onClick={() =>
                setPagination((previousState) => {
                  return {
                    ...previousState,
                    page:
                      previousState.page - 1 === 0 ? 1 : previousState.page - 1,
                  };
                })
              }
            />
          </PaginationItem>
        )}

        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;

          // Show first page, last page, and pages around current page
          if (
            pageNumber === 1 ||
            pageNumber === totalPages ||
            (pageNumber >= pagination.page - 1 &&
              pageNumber <= pagination.page + 1)
          ) {
            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  isActive={pageNumber === pagination.page}
                  onClick={() =>
                    setPagination((previousState) => {
                      return {
                        ...previousState,
                        page: pageNumber,
                      };
                    })
                  }
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          }

          // Show ellipsis for gaps
          if (
            (pageNumber === 2 && pagination.page > 3) ||
            (pageNumber === totalPages - 1 && pagination.page < totalPages - 2)
          ) {
            return (
              <PaginationItem key={pageNumber}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return null;
        })}

        {pagination.page < totalPages && (
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setPagination((previousState) => {
                  return {
                    ...previousState,
                    page:
                      previousState.page + 1 === totalPages
                        ? totalPages
                        : previousState.page + 1,
                  };
                })
              }
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
