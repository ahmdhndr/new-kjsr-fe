import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { articleServices } from "@/shared/services/article.service";

const useGetDetailArticle = (token: string, id: string) => {
  const getDetailArticle = async () => {
    const result = await articleServices.getDetailArticleByUser(token, id);

    return result.data.data;
  };

  const { data: detailArticleData, refetch: refetchDetailArticle } = useQuery({
    queryKey: ["articles"],
    queryFn: getDetailArticle,
    placeholderData: keepPreviousData,
  });

  return {
    detailArticleData,
    refetchDetailArticle,
  };
};

export default useGetDetailArticle;
