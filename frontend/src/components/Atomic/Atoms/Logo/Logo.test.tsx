import { render, screen } from "@testing-library/react";
import Logo from ".";

describe("<Logo />", () => {
  it("<Logo size='XL' /> ", () => {
    render(<Logo size="XL" />);
    // logo 요소 검색
    const logoElem = screen.getByLabelText("logo");
    // document 에 있는지 확인
    expect(logoElem).toBeInTheDocument();
    // 요소의 width 값 확인
    expect(logoElem).toHaveClass("w-[12.875rem]");
  });

  it("<Logo size='L' /> ", () => {
    render(<Logo size="L" />);
    // logo 요소 검색
    const logoElem = screen.getByLabelText("logo");
    // document 에 있는지 확인
    expect(logoElem).toBeInTheDocument();
    // 요소의 width 값 확인
    expect(logoElem).toHaveClass("w-[7.75rem]");
  });

  it("<Logo size='M' /> ", () => {
    render(<Logo />); // default size=M
    // logo 요소 검색
    const logoElem = screen.getByLabelText("logo");
    // document 에 있는지 확인
    expect(logoElem).toBeInTheDocument();
    // 요소의 width 값 확인
    expect(logoElem).toHaveClass("w-[5.25rem]");
  });

  it("<Logo size='SM' /> ", () => {
    render(<Logo size="SM" />);
    // logo 요소 검색
    const logoElem = screen.getByLabelText("logo");
    // document 에 있는지 확인
    expect(logoElem).toBeInTheDocument();
    // 요소의 width 값 확인
    expect(logoElem).toHaveClass("w-[3.875rem]");
  });
});
