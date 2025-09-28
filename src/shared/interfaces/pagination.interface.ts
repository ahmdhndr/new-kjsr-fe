export interface QueryPaginationInterface {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}

export interface MetaPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
