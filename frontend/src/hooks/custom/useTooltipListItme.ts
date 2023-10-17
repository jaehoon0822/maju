import { useCallback, useEffect, useRef, useState } from "react";
import useQueryGetUser from "../queries/useQueryGetUser";
import { useRouter } from "next/router";

const useTooltipListItem = () => {
  const route = useRouter();
  const { data } = useQueryGetUser();
  // sm szie 인지 확인하는 state
  const [isSM, setIsSM] = useState<boolean>(false);
  // tooltip 을 활성화 시키는 state
  const [isActive, setIsActive] = useState<boolean>(false);
  // tooltip 을 참조하는 ref
  const tooltipRef = useRef<HTMLDivElement>(null);

  // tooltip 이외의 영역 클릭시 일어나는 이벤트 함수
  const onClickOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    },
    [tooltipRef]
  );

  // tooltip 클릭시 isActive 를 토글
  const onClickToggleActive = useCallback(
    (e: React.MouseEvent<HTMLElement> | MouseEvent) => {
      e.stopPropagation();
      setIsActive((prev) => !prev);
    },
    [setIsActive]
  );

  useEffect(() => {
    const onChangeRoute = () => {
      setIsActive(false);
    };
    route.events.on("routeChangeComplete", onChangeRoute);
    return () => {
      route.events.off("routeChangeComplete", onChangeRoute);
    };
  }, []);

  // document 객체에 onClikcOutsideClick 이벤트 등록
  useEffect(() => {
    document.addEventListener("click", onClickOutsideClick);
    return () => {
      document.addEventListener("click", onClickOutsideClick);
    };
  }, []);

  // document 객체가 sm 사이즈 라면,
  useEffect(() => {
    setIsSM(window.innerWidth <= 576);
  }, [setIsSM, window.innerWidth]);

  return { isActive, isSM, tooltipRef, onClickToggleActive, data };
};

export default useTooltipListItem;
