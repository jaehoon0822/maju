import classNames from "classnames";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [routerChange, setRouterChange] = useState(false);

  useEffect(() => {
    const handleStart = (url: any) => {
      console.log("start: ", url);
      setRouterChange(true);
    };
    const handleComplate = (url: any) => {
      console.log("complate: ", url);
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
      className={classNames({
        "animate-fadeIn": !routerChange,
      })}
      style={{
        zIndex: 1000,
      }}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
