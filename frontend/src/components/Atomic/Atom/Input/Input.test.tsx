import { fireEvent, render, screen } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { Input } from ".";
import { yupResolver } from "@hookform/resolvers/yup";
import { act } from "react-dom/test-utils";

// Input test 를 위한 테스트 컴포넌트
const TestComponent = () => {
  const testSchema = yup.object({
    test: yup
      .string()
      .required("내용을 입력해주세요.")
      .min(2, "2자 이상 입력해주세요."),
  });
  // yup 에 의존하고 있으므로, test 를 위해
  const method = useForm({
    resolver: yupResolver(testSchema),
    mode: "onBlur",
  });
  return (
    <FormProvider {...method}>
      <Input label="test" name="test" id="test" />
    </FormProvider>
  );
};

describe("<Input />", () => {
  it("에러 없이 Input render", () => {
    render(<TestComponent />);
    // input 의 라벨을 사용하여 Input element 를 찾음
    const testInputElem = screen.getByLabelText<HTMLInputElement>("test");
    // input 이 있는지 확인
    expect(testInputElem).toBeInTheDocument();
    act(() => {
      // input 에 value 할당
      fireEvent.change(testInputElem, { target: { value: "test" } });
    });
    // input 에 "test" value 있는지 확인
    expect(testInputElem.value).toBe("test");
  });

  it("에러 발생 Input render", async () => {
    render(<TestComponent />);
    // input 의 라벨을 사용하여 Input element 를 찾음
    const testInputElem = screen.getByLabelText<HTMLInputElement>("test");
    // input 이 blur 이벤트가 발생했는지 확인을 위한 mock 함수
    const onBlurSpy = jest.spyOn(testInputElem, "blur");
    // input 이 있는지 확인
    expect(testInputElem).toBeInTheDocument();

    await act(async () => {
      // input 에 value 할당 (2자이상 입력해야 하지만 1자만 입력)
      fireEvent.change(testInputElem, { target: { value: "일" } });
      // input 포커스
      testInputElem.focus();
      // useForm 의 mode 가 onBlur 이므로, blur event 실행
      fireEvent.blur(testInputElem);
    });

    // input value 확인
    expect(testInputElem.value).toBe("일");
    // 에러 발생확인을 위한 span 검색
    const errorSpanElem = screen.getByText(/2자 이상 입력해주세요./);
    // errprSpanElem 이 있는지 확인
    expect(errorSpanElem).toBeInTheDocument();
  });
});
