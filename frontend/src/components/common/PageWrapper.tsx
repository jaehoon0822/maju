import classNames from "classnames";
import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [routerChange, setRouterChange] = useState(false);

  useEffect(() => {
    const handleStart = (url: any) => {
      setRouterChange(true);
    };
    const handleComplate = (url: any) => {
      setRouterChange(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplate);
    router.events.on("routeChangeError", handleComplate);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplate);
      router.events.off("routeChangeError", handleComplate);
    };
  }, []);

  return (
    <div
      className={classNames("w-full", {
        "animate-fadeIn": !routerChange,
      })}
      style={{
        zIndex: 40,
      }}
    >
      {children}
    </div>
  );
};

export default memo(PageWrapper);
