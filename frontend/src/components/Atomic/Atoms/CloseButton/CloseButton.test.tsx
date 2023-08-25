import { fireEvent, render, screen } from "@testing-library/react";
import { CloseButton } from "@/components/Atomic/Atoms/CloseButton";
import { act } from "react-dom/test-utils";

describe("<CloseButton />", () => {
  it("버튼 클릭 및 onChange 적용", async () => {
    const mockOnClick = jest.fn();
    // CloseButton 렌더링
    render(<CloseButton onClick={mockOnClick} />);
    // close_button 을 가진 aria-label 검색
    const closeButton = screen.getByLabelText("close-button");
    // 해당 버튼이 있는지 확인
    expect(closeButton).toBeInTheDocument();
    // 버튼 클릭
    await act(async () => {
      fireEvent.click(closeButton);
    });
    // mockOnChange 가 호출되었는지 확인
    expect(mockOnClick).toHaveBeenCalled();
  });
});
