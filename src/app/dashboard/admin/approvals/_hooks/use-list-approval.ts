import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import {
  LIMIT_DEFAULT,
  PAGE_DEFAULT,
} from "@/components/datatable/datatable-constants";
import { useDebounce } from "@/hooks/use-debounce";

import { preapprovalServices } from "../_services/preapproval.service";

const useListPreapproval = (token: string) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const debounce = useDebounce();

  const [currentPage, setCurrentPage] = useState(
    searchParams.get("page") || String(PAGE_DEFAULT)
  );
  const [currentLimit, setCurrentLimit] = useState(
    searchParams.get("limit") || String(LIMIT_DEFAULT)
  );
  const [currentSearch, setCurrentSearch] = useState(
    searchParams.get("search") || ""
  );

  useEffect(() => {
    setCurrentPage(searchParams.get("page") || String(PAGE_DEFAULT));
    setCurrentLimit(searchParams.get("limit") || String(LIMIT_DEFAULT));
    setCurrentSearch(searchParams.get("search") || "");
  }, [searchParams]);

  const [searchInput, setSearchInput] = useState(currentSearch);

  // Utility buat build URL params
  const buildParams = useCallback(
    (overrides: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(overrides).forEach(([key, value]) => {
        params.set(key, value);
      });
      return params.toString();
    },
    [searchParams]
  );

  // Update full URL
  const setURL = () => {
    const query = buildParams({
      page: currentPage,
      limit: currentLimit,
      search: currentSearch,
    });

    router.replace(`${pathname}?${query}`);
  };

  const handleChangePage = (page: number) => {
    const query = buildParams({
      page: String(page),
      limit: currentLimit,
      search: currentSearch,
    });

    router.replace(`${pathname}?${query}`);
  };

  const handleChangeLimit = (limit: string) => {
    const query = buildParams({
      page: String(PAGE_DEFAULT),
      limit,
      search: currentSearch,
    });

    router.replace(`${pathname}?${query}`);
  };

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);

    debounce(() => {
      const query = buildParams({
        page: String(PAGE_DEFAULT),
        limit: currentLimit,
        search: e.target.value,
      });
      router.replace(`${pathname}?${query}`);
    }, 500);
  };

  // Fetch preapprovals
  const getPreapprovals = async () => {
    const query = `page=${currentPage}&limit=${currentLimit}${
      currentSearch ? `&search=${currentSearch}` : ""
    }`;
    const res = await preapprovalServices.listApproval(token, query);
    return res.data.data;
  };

  const {
    data: preapprovalData,
    isLoading: isLoadingPreapproval,
    isRefetching: isRefetchingPreapproval,
    refetch: refetchPreapproval,
  } = useQuery({
    queryKey: ["preapprovals", currentPage, currentLimit, currentSearch],
    queryFn: getPreapprovals,
    placeholderData: keepPreviousData,
  });

  return {
    currentPage,
    currentLimit,
    currentSearch: searchInput,
    preapprovalData,
    isLoadingPreapproval,
    isRefetchingPreapproval,
    handleChangePage,
    handleChangeLimit,
    handleChangeSearch,
    setURL,
    refetchPreapproval,
  };
};

export default useListPreapproval;
