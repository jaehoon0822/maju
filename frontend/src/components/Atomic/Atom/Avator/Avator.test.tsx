import { render, screen } from "@testing-library/react";
import { Avatar } from ".";

describe("<Avator />", () => {
  it("Avator 이미지 없을때", async () => {
    render(<Avatar href="/" />);
    // svg 가 PersonIcon 인 엘리먼트 쿼리
    const avatarElem = screen.getByTestId("PersonIcon");
    // 도튜먼트에 있는지 확인
    expect(avatarElem).toBeInTheDocument();
  });

  it("Avator 이미지 있을때", async () => {
    render(<Avatar href="/" avatar="/user1.jpg" />);
    // svg 가 PersonIcon 인 엘리먼트 쿼리
    const avatarElem = screen.getByRole("img", { name: "avatar" });
    // 도튜먼트에 있는지 확인
    expect(avatarElem).toBeInTheDocument();
  });
});
