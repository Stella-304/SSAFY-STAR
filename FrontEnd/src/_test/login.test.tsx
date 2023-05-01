import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Login from "../pages/User/Login";
import { renderWithProviders } from "../utils/redux_test";

//로그인에서 테스트는?

//아이디만 눌러서 로그인 - 실패
//비번만 입력해서 로그인 - 실패
describe("로그인 테스트", () => {
  it("아이디만 입력", async () => {
    renderWithProviders(<Login />);
    const email = screen.getByLabelText("이메일");

    fireEvent.change(email, { target: { value: "test@test.com" } });

    const login = screen.getByText("로그인");

    fireEvent.click(login);

    //비밀번호 확인하라는 문구 표시
    //expect(await screen.findAllByText("비밀번호를 입력해주세요")).toBeTruthy();
  });
});

export {};
