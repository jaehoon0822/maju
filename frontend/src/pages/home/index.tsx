import HomeTemplate from "@/components/Atomic/Templates/HomeTemplate";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home = () => {
  const { query } = useRouter();
  useEffect(() => {
    document.body.style.overflow = "auto";
  }, [query]);
  return <HomeTemplate />;
};

export default Home;
