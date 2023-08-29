import React, { useEffect, useRef, useState } from "react";
import useQueryGetUser from "../queries/useQueryGetUser";

const useTooltipListItem = () => {
  const { data } = useQueryGetUser();
  // tooltip 을 활성화 시키는 state
  const [isActive, setIsActive] = useState<boolean>(false);
  // tooltip 을 참조하는 ref
  const tooltipRef = useRef<HTMLDivElement>(null);

  // tooltip 이외의 영역 클릭시 일어나는 이벤트 함수
  const onClickOutsideClick = (event: MouseEvent) => {
    if (
      tooltipRef.current &&
      !tooltipRef.current.contains(event.target as Node)
    ) {
      setIsActive(false);
    }
  };

  // tooltip 클릭시 isActive 를 토글
  const onClickToggleActive = () => {
    setIsActive((prev) => !prev);
  };

  // document 객체에 onClikcOutsideClick 이벤트 등록
  useEffect(() => {
    document.addEventListener("click", onClickOutsideClick);
    return () => {
      document.addEventListener("click", onClickOutsideClick);
    };
  }, []);

  return { isActive, tooltipRef, onClickToggleActive, data };
};

export default useTooltipListItem;
