import * as yup from "yup";
import Form from "../Form/Index";
import { fireEvent, render, screen } from "@testing-library/react";
import Input from "../Inputs";
import { act } from "react-dom/test-utils";
import FormButton from ".";

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
        <FormButton label="test버튼" variant="primary" />
      </Form>
    );
  };
});

describe("<FormButton />", () => {
  it("버튼 생성 및 sumbit 실행", async () => {
    // TestComponent 렌더링
    render(<TestComponent />);
    // "test버튼" 을 가진 Element 탐색
    const buttonElem = screen.getByText<HTMLButtonElement>(/test버튼/);
    const inputElem = screen.getByLabelText<HTMLButtonElement>(/test/);
    // Element 가 존재하는지 확인
    expect(buttonElem).toBeInTheDocument();
    expect(buttonElem.type).toBe("submit");

    // 버튼 클릭전 disabled = true
    expect(buttonElem.disabled).toBe(true);

    await act(async () => {
      // input 입력
      fireEvent.change(inputElem, { target: { value: "test!!" } });
    });

    await act(async () => {
      // button 클릭
      fireEvent.click(buttonElem);
    });

    // 버튼 클릭후 disabled = false
    expect(buttonElem.disabled).toBe(false);

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

    // 버튼 클릭전 disabled = true
    expect(buttonElem.disabled).toBe(true);

    // input 에 값 설정되지 않았다면, button disabled
    // 그러므로 바로 button 클릭
    await act(async () => {
      fireEvent.click(buttonElem);
    });

    // 버튼 클릭후 disabled = true
    // --> Input 입력 안됨
    expect(buttonElem.disabled).toBe(true);

    // button 은 disabled 상태이니 mockFn 호출되지 않음
    expect(mockFn).not.toHaveBeenCalled();
  });
});
