import { useRouter } from "next/router";
import { getPathname } from "@/common/utils/getPathname";

const useGetPathname = ({ queryString }: { queryString: string }) => {
  const { asPath, query } = useRouter();
  const queryPage = (query.page as string) ?? "";
  const pathname = getPathname({ asPath, queryPage, queryString });
  return { pathname };
};

export default useGetPathname;
