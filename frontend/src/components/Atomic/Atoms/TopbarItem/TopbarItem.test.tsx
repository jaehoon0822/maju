import { fireEvent, render, screen } from "@testing-library/react";
import { TopbarItem } from ".";
import { act } from "react-dom/test-utils";

describe("<TopbarItem />", () => {
  const mockFn: jest.Mock = jest.fn();
  it("topbarItem 클릭", async () => {
    render(<TopbarItem title="test" onClick={mockFn} />);
    // topbarItem 요소 검색
    const topbarItemElem = screen.getByRole("button", { name: "test" });
    // document 에 있는지 확인
    expect(topbarItemElem).toBeInTheDocument();

    // 요소 클릭
    await act(async () => {
      fireEvent.click(topbarItemElem);
    });

    // mockFn 이 호출되었는지 확인
    expect(mockFn).toHaveBeenCalled();
  });
});
