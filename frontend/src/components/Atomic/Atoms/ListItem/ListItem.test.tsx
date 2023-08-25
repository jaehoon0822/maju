import { render, screen } from "@testing-library/react";
import Star from "@mui/icons-material/Star";
import { ListItem } from ".";

describe("<ListItem />", () => {
  it("ListItem title 및 icon 확인", () => {
    // ListItem 렌더
    render(<ListItem title="test" icon={<Star />} />);

    // ListItem 쿼리
    const listItemElem = screen.getByLabelText("list-item");
    // document 에 있는지 확인
    expect(listItemElem).toBeInTheDocument();
    // ListItem background=color 색상 확인
    expect(listItemElem).toHaveStyle("background-color: rgba(255,255,255)");

    // ListItem 의 title 이 test 인지 확인위한 쿼리
    const testTitleElem = screen.getByText(/test/);
    // document 에 있는지 확인
    expect(testTitleElem).toBeInTheDocument();

    // Icon 이 있는지 확인하귀 위한 쿼리
    const iconElem = screen.getByTestId("StarIcon");
    // document 에 있는지 확인
    expect(iconElem).toBeInTheDocument();
  });

  it("active = true", () => {
    // ListItem 렌더
    render(<ListItem title="test" icon={<Star />} active={true} />);

    // ListItem 쿼리
    const listItemElem = screen.getByLabelText("list-item");
    // document 에 있는지 확인
    expect(listItemElem).toBeInTheDocument();
  });
});
