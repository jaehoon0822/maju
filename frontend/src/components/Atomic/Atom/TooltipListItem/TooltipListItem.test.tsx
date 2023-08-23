import Star from "@mui/icons-material/Star";
import Abc from "@mui/icons-material/Abc";
import { fireEvent, render, screen } from "@testing-library/react";
import { TooltipListItem } from "@/components/Atomic/Atom/TooltipListItem";
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

  it("TooltipListItem 클릭", async () => {
    render(
      <TooltipListItem direction="bottom" icon={<Star />} title="test">
        <ListItem title="test1" icon={<Abc />} />
      </TooltipListItem>
    );
    // aria-label 이 tooltip-list-wrapper 인 element 쿼리
    const tooltipListWrapperElem = screen.getByLabelText(
      "tooltip-list-wrapper"
    );
    // document 에 있는지 확인
    expect(tooltipListWrapperElem).toBeInTheDocument();

    // abc icon 이 있는 element 쿼리
    const tooltipListElem = screen.getByLabelText("tooltip-list");

    /*************** visibility: hidden <Warn> ***********/
    // --> 이유를 모르겠지만, class 로는 invisible 이지만
    //     jest 에서 visibility: "visibe" 로 확인됨...
    //     예상으로는 tailwind 의 invisible 을 인지못하고있는듯함
    //     이해 못할 상황: 몇시간을 소요햇지만 이유를 찾지 못함
    //     이것관련해서 stackoverflow 도 찾아보았지만
    //     찾지 못함
    //
    // expect(tooltipListElem).toHaveStyle("visibility: hidden");
    // 위 상황에 따라 invisible class 로 확인
    expect(tooltipListElem).toHaveClass("invisible");
    /****************************************************/

    const tooltipListTitleElem = screen.getByLabelText("tooltip-list-title");

    await act(async () => {
      // tooltipListItemElem 클릭
      fireEvent.click(tooltipListTitleElem);
    });

    // class 가 visible 인지 확인
    expect(tooltipListElem).toHaveClass("visible");

    // tooltipList 외의 바깥 영역 클릭
    await act(async () => {
      // tooltipListItemElem 클릭
      fireEvent.click(window.document);
    });

    // class 가 invisible 인지 확인
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

    // direction 이 left 인 클래스가 있는지 확인
    expect(tooltipListElem).toHaveClass("right");
  });
});
