import * as yup from "yup";
import { Button } from ".";
import { Form } from "../Form/Index";
import { fireEvent, render, screen } from "@testing-library/react";
import { Input } from "../Input";
import { act } from "react-dom/test-utils";

// test 에 사용될 컴포넌트
let TestComponent: React.FC;
// test 에 사용될 mock 함수
let mockFn: jest.Mock;

// 각 테시트 이전에 실행될 함수
beforeEach(() => {
  // submit 시 실행될 mock 함수
  mockFn = jest.fn((data: { test: string }) => data);
  // Input test 를 위한 테스트 컴포넌트
  TestComponent = () => {
    // Form 의 register 에 들어갈 test schema
    const testSchema = yup.object({
      test: yup
        .string()
        .required("내용을 입력해주세요.")
        .min(2, "2자 이상 입력해주세요."),
    });
    return (
      <Form onSubmit={mockFn} schema={testSchema}>
        <Input label="test" id="test" name="test" />
        <Button label="test버튼" variant="primary" size="large" />
      </Form>
    );
  };
});

describe("<Button />", () => {
  it("버튼 생성 및 sumbit 실행", async () => {
    // TestComponent 렌더링
    render(<TestComponent />);
    // "test버튼" 을 가진 Element 탐색
    const buttonElem = screen.getByText<HTMLButtonElement>(/test버튼/);
    const inputElem = screen.getByLabelText<HTMLButtonElement>(/test/);
    // Element 가 존재하는지 확인
    expect(buttonElem).toBeInTheDocument();
    expect(buttonElem.type).toBe("submit");

    // 버튼 클릭
    await act(async () => {
      // input 입력
      fireEvent.change(inputElem, { target: { value: "test!!" } });
      // button 클릭
      fireEvent.click(buttonElem);
    });

    // 호출되었는지 확인
    expect(mockFn).toHaveBeenCalled();
  });

  it("disabled 일때 버튼 클릭", async () => {
    // test component 렌더링
    render(<TestComponent />);

    // "test버튼" 을 가진 Element 탐색
    const buttonElem = screen.getByText<HTMLButtonElement>(/test버튼/);
    // input 엘리먼트 검색
    const inputElem = screen.getByLabelText<HTMLButtonElement>(/test/);

    // Element 가 존재하는지 확인
    expect(buttonElem).toBeInTheDocument();
    expect(inputElem).toBeInTheDocument();

    // button 의 type 이 submit 인지 확인
    expect(buttonElem.type).toBe("submit");

    // input 에 값 설정되지 않았다면, button disabled
    // 그러므로 바로 button 클릭
    await act(async () => {
      fireEvent.click(buttonElem);
    });

    // button 은 disabled 상태이니 mockFn 호출되지 않음
    expect(mockFn).not.toHaveBeenCalled();
  });

  it("버튼 variant 변경", () => {
    // 각 다른 variant 버튼을 rendering
    render(
      <div>
        <Button label="primary버튼" variant="primary" size="large" />
        <Button label="kakao버튼" variant="kakao" size="large" />
      </div>
    );

    // 버튼 엘리먼트 검색
    const primaryBtnElem = screen.getByText<HTMLButtonElement>(/primary버튼/);
    const kakaoBtnElem = screen.getByText<HTMLButtonElement>(/kakao버튼/);

    // 버튼이 document 에 있는지 확인
    expect(primaryBtnElem).toBeInTheDocument();
    expect(kakaoBtnElem).toBeInTheDocument();

    // 버튼의 className 확인
    expect(primaryBtnElem.className).toMatch(/btn-primary/);
    expect(kakaoBtnElem.className).toMatch(/btn-kakao/);
  });
});
