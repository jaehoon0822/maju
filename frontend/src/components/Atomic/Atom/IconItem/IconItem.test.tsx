import MoreHoriz from "@mui/icons-material/MoreHoriz";
import { fireEvent, render, screen } from "@testing-library/react";
import AbcSvg from "@mui/icons-material/Abc";
import IconItem from ".";
import { act } from "react-dom/test-utils";
import { ListItem } from "../ListItem";

describe("<IconItem />", () => {
  it("IconItem 이 more 일때, tooltip 테스트", async () => {
    render(
      <IconItem Icon={MoreHoriz} variants="red" more>
        <ListItem href="/" icon={<AbcSvg />} title="title" />
      </IconItem>
    );
    // aria-label = icon-item 엘리먼트 쿼리
    const iconItemElem = screen.getByLabelText("icon-item");
    // 도큐먼트에 있는지 확인
    expect(iconItemElem).toBeInTheDocument();

    // icon 을 둘러싼 div 쿼리
    const iconToggleElem = screen.getByTestId("icon-toggle");
    // 도큐먼트에 있는지 확인
    expect(iconToggleElem).toBeInTheDocument();
    // toggle 이 invisible 인지 확인
    expect(iconToggleElem).toHaveClass("invisible");

    // iconItem 클릭
    await act(async () => {
      fireEvent.click(iconItemElem);
    });

    // toggle 이 visible 인지 확인
    expect(iconToggleElem).toHaveClass("visible");

    // iconItem 이 아닌 바깥 영역 클릭
    await act(async () => {
      fireEvent.click(document);
    });

    // toggle 이 visible 인지 확인
    expect(iconToggleElem).toHaveClass("invisible");
  });
  it("IconItem 이 more 가 아닐때, tooltip 테스트", async () => {
    render(
      <IconItem Icon={MoreHoriz} variants="red">
        {/*  more 가 false 라서 tooltip 생성 안됨
         *  테스트용도로 children 에 생성해봄
         */}
        <ListItem href="/" icon={<AbcSvg />} title="title" />
      </IconItem>
    );
    // aria-label = icon-item 엘리먼트 get
    const iconItemElem = screen.getByLabelText<HTMLButtonElement>("icon-item");
    // 도큐먼트에 있는지 확인
    expect(iconItemElem).toBeInTheDocument();

    // button 의 click 이벤트가 undefined 인지 확인
    expect(iconItemElem.click()).toBe(undefined);

    // icon 을 둘러싼 div 쿼리
    const iconToggleElem = screen.queryByTestId("icon-toggle");
    // 도큐먼트에 없는지 확인
    expect(iconToggleElem).not.toBeInTheDocument();
  });
});
