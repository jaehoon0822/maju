import { fireEvent, render, screen } from "@testing-library/react";
import TextButton from ".";

describe("<TextButton />", () => {
  it("label text 확인", () => {
    // <TextButton /> 렌더
    render(<TextButton lable="login 페이지로 가기" href="/login" />);
    // login 페이지로 가기 텍스트를 가진 Element
    const textButton = screen.getByText(/login 페이지로 가기/);
    // 해당하는 element 가 존재하는지 확인
    expect(textButton).toBeInTheDocument();
  });

  it("href 확인", () => {
    // <TextButton /> 렌더
    render(<TextButton lable="login 페이지로 가기" href="/login" />);
    // link Element
    const textButton = screen.getByRole("link");
    // 해당하는 element 가 존재하는지 확인
    expect(textButton).toBeInTheDocument();
    // text button 의 href 확인
    expect(textButton).toHaveAttribute("href", "/login");
  });
});
