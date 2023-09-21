import { useRouter } from "next/router";

const useLayout = () => {
  const { pathname, query } = useRouter();
  return { pathname, query };
};

export default useLayout;
