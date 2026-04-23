
export interface IPagination {
    page: number;
    pageSize: number,
    pageCount?: number | null;
    total?: number | null;
}



export interface IPaginationDto {
    total: number;
    firstPageNumber: number;
    lastPageNumber: number;
    showed: number;
}
