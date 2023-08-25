import Star from "@mui/icons-material/Star";
import Abc from "@mui/icons-material/Abc";
import { fireEvent, render, screen } from "@testing-library/react";
import { TooltipListItem } from "@/components/Atomic/Atoms/TooltipListItem";
import { ListItem } from "../ListItem";
import { act } from "react-dom/test-utils";

describe("<TooltipListItem />", () => {
  it("TooltipListItem 존재 확인", () => {
    render(
      <TooltipListItem direction="bottom" icon={<Star />} title="test">
        <ListItem title="test1" icon={<Abc />} />
      </TooltipListItem>
    );
    // aria-label 이 tooltip-list-item 인 element 쿼리
    const tooltipListWrapperElem = screen.getByLabelText(
      "tooltip-list-wrapper"
    );
    // document 에 있는지 확인
    expect(tooltipListWrapperElem).toBeInTheDocument();
  });

  it("TooltipListItem 에 more 아이콘 확인", () => {
    render(
      <TooltipListItem direction="bottom" icon={<Star />} title="test">
        <ListItem title="test1" icon={<Abc />} />
      </TooltipListItem>
    );
    // more icon 이 있는지 확인
    const moreIconElem = screen.getByTestId("MoreVertIcon");
    // document 에 있는지 확인
    expect(moreIconElem).toBeInTheDocument();
  });

  it("TooltipListItem 클릭시 tooltip 메뉴 확인", async () => {
    render(
      <TooltipListItem direction="bottom" icon={<Star />} title="test">
        <ListItem title="test1" icon={<Abc />} />
      </TooltipListItem>
    );

    // click 할 컴포넌트 쿼리
    const tooltipListTitleElem = screen.getByLabelText("tooltip-list-title");
    // 해당 컴포넌트 있는지 확인
    expect(tooltipListTitleElem).toBeInTheDocument();

    // tooltip 컴포넌트 쿼리
    const tooltipListElem = screen.getByLabelText("tooltip-list");
    // tooltip 이 invisible 인지 확인
    expect(tooltipListElem).toHaveClass("invisible");

    await act(async () => {
      // 컴포넌트 클릭
      fireEvent.click(tooltipListTitleElem);
    });

    // tooltip 이 invisible 인지 확인
    expect(tooltipListElem).toHaveClass("visible");

    // tooltip 외의 영역 클릭
    await act(async () => {
      // document 영역 클릭
      fireEvent.click(document);
    });

    // tooltip 이 invisible 인지 확인
    expect(tooltipListElem).toHaveClass("invisible");
  });

  it("direction top 확인", () => {
    // tooltipListItem 렌더
    render(
      <TooltipListItem direction="top" title="top" icon={<Abc />}>
        <ListItem title="test1" />
      </TooltipListItem>
    );
    // direction 클래스가 적용된 tooltip-list 쿼리
    const tooltipListElem = screen.getByLabelText("tooltip-list");
    // document 에 있는지 확인
    expect(tooltipListElem).toBeInTheDocument();

    // direction 이 top 인 클래스가 있는지 확인
    expect(tooltipListElem).toHaveClass("top");
  });

  it("direction bottom 확인", () => {
    // tooltipListItem 렌더
    render(
      <TooltipListItem direction="bottom" title="bottom" icon={<Abc />}>
        <ListItem title="test1" />
      </TooltipListItem>
    );
    // direction 클래스가 적용된 tooltip-list 쿼리
    const tooltipListElem = screen.getByLabelText("tooltip-list");
    // document 에 있는지 확인
    expect(tooltipListElem).toBeInTheDocument();

    // direction 이 bottom 인 클래스가 있는지 확인
    expect(tooltipListElem).toHaveClass("bottom");
  });

  it("direction left 확인", () => {
    // tooltipListItem 렌더
    render(
      <TooltipListItem direction="left" title="left" icon={<Abc />}>
        <ListItem title="test1" />
      </TooltipListItem>
    );
    // direction 클래스가 적용된 tooltip-list 쿼리
    const tooltipListElem = screen.getByLabelText("tooltip-list");
    // document 에 있는지 확인
    expect(tooltipListElem).toBeInTheDocument();

    // direction 이 left 인 클래스가 있는지 확인
    expect(tooltipListElem).toHaveClass("left");
  });

  it("direction right 확인", () => {
    // tooltipListItem 렌더
    render(
      <TooltipListItem direction="right" title="right" icon={<Abc />}>
        <ListItem title="test1" />
      </TooltipListItem>
    );
    // direction 클래스가 적용된 tooltip-list 쿼리
    const tooltipListElem = screen.getByLabelText("tooltip-list");
    // document 에 있는지 확인
    expect(tooltipListElem).toBeInTheDocument();

    // direction 이 right 인 클래스가 있는지 확인
    expect(tooltipListElem).toHaveClass("right");
  });
});
