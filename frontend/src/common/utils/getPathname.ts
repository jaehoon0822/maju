export const getPathname = ({
  asPath,
  queryPage,
  queryString,
}: {
  asPath: string;
  queryPage?: string;
  queryString: string;
}) => {
  const pathname = asPath.split("?")[0];
  return `${pathname}?${
    queryPage ? `${`page=${queryPage}&`}` : ""
  }${queryString}`;
};
