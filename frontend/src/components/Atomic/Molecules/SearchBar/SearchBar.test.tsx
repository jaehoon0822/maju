import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import SearchBar from ".";

describe("<SearchBar />", () => {
  let mockFn: jest.Mock;
  beforeEach(() => {
    mockFn = jest.fn();
    render(<SearchBar onSubmit={mockFn} />);
  });

  it("SearchBar 겁색", async () => {
    // search label 검색
    const searchBarInput = screen.getByLabelText<HTMLInputElement>("search");
    // document 에 있는지 확인
    expect(searchBarInput).toBeInTheDocument();
    // 버튼 검색
    const searchBarBtn = screen.getByText(/검색/);
    // document 에 있는지 확인
    expect(searchBarBtn).toBeInTheDocument();

    // Input 입력
    await act(async () => {
      fireEvent.change(searchBarInput, { target: { value: "해시태그" } });
    });
    // 입력된 글자가 "해시태그" 가 맞는지 확인
    expect(searchBarInput.value).toBe("해시태그");

    // 검색 버튼 클릭
    await act(async () => {
      fireEvent.click(searchBarBtn);
    });

    // 버튼 클릭되어 mockFn 이 호출되었는지 확인
    expect(mockFn).toHaveBeenCalled();
  });

  it("SearchBar 빈문자 입력", async () => {
    // search label 검색
    const searchBarInput = screen.getByLabelText<HTMLInputElement>("search");
    // document 에 있는지 확인
    expect(searchBarInput).toBeInTheDocument();
    // 버튼 검색
    const searchBarBtn = screen.getByText(/검색/);
    // document 에 있는지 확인
    expect(searchBarBtn).toBeInTheDocument();

    // Input 입력
    await act(async () => {
      fireEvent.change(searchBarInput, { target: { value: "" } });
    });
    // 입력된 글자가 "" 가 맞는지 확인
    expect(searchBarInput.value).toBe("");

    // 검색 버튼 클릭
    await act(async () => {
      fireEvent.click(searchBarBtn);
    });

    // 버튼 클릭되어 mockFn 이 호출 안되었는지 확인
    expect(mockFn).not.toHaveBeenCalled();

    // Error 문자열 검색
    const errorTextElem = screen.getByText(/글자를 입력해 주세요./);
    // error 문자열이 있는지 확인
    expect(errorTextElem).toBeInTheDocument();
  });
});
