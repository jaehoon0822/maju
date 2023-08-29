import { fireEvent, render, screen } from "@testing-library/react";
import { TopbarItem } from "../../Atoms/TopbarItem";
import { TopbarMenu } from ".";
import { act } from "react-dom/test-utils";

describe("<TopbarMenu />", () => {
  // mock 함수
  const mockFn: jest.Mock = jest.fn();

  it("TopbarMenu 클릭", async () => {
    render(
      <TopbarMenu>
        <TopbarItem title="test" onClick={mockFn} />
      </TopbarMenu>
    );
    // aria-label 이 topbar-menu 인 요소 탐색
    const topbarMenuElem = screen.getByLabelText("topbar-menu");
    // document 에 있는지 확인
    expect(topbarMenuElem).toBeInTheDocument();

    // TopbarItem 요소 탐색
    const topbarItemElem = screen.getByText(/test/);
    // document 에 있는지 확인
    expect(topbarItemElem).toBeInTheDocument();

    // topbarItemElem 클릭
    await act(async () => {
      fireEvent.click(topbarItemElem);
    });

    // mock 함수가 호출되었는지 확인
    expect(mockFn).toHaveBeenCalled();
  });
});
