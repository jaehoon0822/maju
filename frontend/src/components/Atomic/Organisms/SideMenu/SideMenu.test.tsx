import { fireEvent, render, screen } from "@testing-library/react";
import Home from "@mui/icons-material/Home";
import ManageSearchOutlined from "@mui/icons-material/ManageSearchOutlined";
import SideMenu from ".";
import { ListItem } from "../../Atoms/ListItem";
import { act } from "react-dom/test-utils";

describe("<SideMenu />", () => {
  beforeEach(() => {
    render(
      <SideMenu>
        <ListItem icon={<Home />} title="홈" href="/" active />
        <ListItem
          icon={<ManageSearchOutlined />}
          title="로그인"
          href="/Login"
        />
      </SideMenu>
    );
  });
  it("sideMenu item 클릭시 path 경로 확인", () => {
    // aria-label 이 side-menu 인 요소 탐색
    const sideMenuElem = screen.getByLabelText("side-menu");
    // document 에 있는지 확인
    expect(sideMenuElem).toBeInTheDocument();

    // a 요소 탐색
    const homeLinkEleme = screen.getByText<HTMLLinkElement>("홈").closest("a");
    // href 가 '/' 인지 확인
    expect(homeLinkEleme).toHaveAttribute("href", "/");

    // a 요소 탐색
    const LoginLinkEleme = screen
      .getByText<HTMLLinkElement>("로그인")
      .closest("a");
    // href 가 '/' 인지 확인
    expect(LoginLinkEleme).toHaveAttribute("href", "/Login");
  });

  it("tooltip 메뉴 아이템", async () => {
    // aria-label 이 tooltip-list-title 인 요소 탐색
    const tooltipListTitleElem = screen.getByLabelText("tooltip-list-title");
    // document 에 있는지 확인
    expect(tooltipListTitleElem).toBeInTheDocument();

    // aria-label 이 tooltip-list 인 요소 탐색
    const tooltipListElem = screen.getByLabelText("tooltip-list");
    // tooltip-list 요소가 invisible 인지 확인
    expect(tooltipListElem).toHaveClass("invisible");

    // 해당 요소 클릭
    await act(async () => {
      fireEvent.click(tooltipListTitleElem);
    });

    // 클릭이후 tooltip 이 visible 인지 확인
    expect(tooltipListElem).toHaveClass("visible");

    // 프로필 보기 a 요소 검색
    const profileViewLinkElem = screen.getByText(/프로필 보기/).closest("a");
    // document 에 있는지 확인
    expect(profileViewLinkElem).toBeInTheDocument();
    // href 가 /profile 인지 확인
    expect(profileViewLinkElem).toHaveAttribute("href", "/profile");

    // 로그아웃 하기 a 요소 검색
    const logoutLinkElem = screen.getByText(/로그아웃 하기/).closest("a");
    // document 에 있는지 확인
    expect(logoutLinkElem).toBeInTheDocument();
    // href 가 /logout 인지 확인
    expect(logoutLinkElem).toHaveAttribute("href", "/logout");
  });
});
