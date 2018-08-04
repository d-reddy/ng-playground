export class PageRequest {
    pageIndex: number;  // which page
    pageSize: number;   // count per page     
}

export class PageResponse<T> {
    total: number;      // total number of items in full collection
    pageIndex: number;  // page index returned
    pageSize: number;   // count per page
    results: Array<T>;  // items for the current page
}