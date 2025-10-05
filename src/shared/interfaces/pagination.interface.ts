export interface QueryPaginationInterface {
  page?: number;
  limit?: number;
  search?: string;
}

export interface MetaPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ArticlePaginationInterface extends QueryPaginationInterface {
  category?: string;
}
