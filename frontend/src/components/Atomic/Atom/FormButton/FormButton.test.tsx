import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "../Button";
import { Form } from "../Form/Index";
import { render, screen } from "@testing-library/react";
import { Input } from "../Input";

// Input test 를 위한 테스트 컴포넌트
const TestComponent = () => {
  // Form 의 register 에 들어갈 test schema
  const testSchema = yup.object({
    test: yup
      .string()
      .required("내용을 입력해주세요.")
      .min(2, "2자 이상 입력해주세요."),
  });
  // submit 시 실행될 mock 함수
  const mockFn = jest.fn((data: { test: string }) => data);
  return (
    <Form onSubmit={mockFn} schema={testSchema}>
      <Input label="test" id="test" name="test" />
      <Button label="test버튼" variant="primary" />
    </Form>
  );
};

describe("<FormButton />", () => {
  it("버튼 생성 및 실행", () => {
    // TestComponent 렌더링
    render(<TestComponent />);
    // "test버튼" 을 가진 Element 탐색
    const buttonElem = screen.getByText(/test버튼/);
    // Element 가 존재하는지 확인
    expect(buttonElem).toBeInTheDocument();
  });
});
