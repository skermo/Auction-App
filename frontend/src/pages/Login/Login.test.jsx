jest.mock("../../hooks/useAuth");
jest.mock("../../config", () => ({
  BASE_URL: "http://mocked-url.com/api",
}));

const mockedUseAuth = useAuth;
const mockNavigate = jest.fn();

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";
import useAuth from "../../hooks/useAuth";

describe("Login component", () => {
  const mockLoginUser = jest.fn();

  beforeEach(() => {
    mockedUseAuth.mockReturnValue({
      loginUser: mockLoginUser,
    });
    mockNavigate.mockClear();
    mockLoginUser.mockReset();
  });

  const setup = () =>
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

  test("valid email and password should be accepted and redirect", async () => {
    mockLoginUser.mockResolvedValueOnce();

    setup();

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "validpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(mockLoginUser).toHaveBeenCalledWith(
        { email: "user@example.com", password: "validpassword" },
        false
      );
      expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true });
    });
  });

  test("invalid email format should be rejected", async () => {
    setup();

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "invalid-email" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "validpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(await screen.findByText(/email must be valid/i)).toBeInTheDocument();

    expect(mockLoginUser).not.toHaveBeenCalled();
  });

  test("email exceeding 320 characters should be rejected", async () => {
    setup();

    const longEmail = "a".repeat(321) + "@example.com";

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: longEmail },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "validpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(
      await screen.findByText(/email must be less than 320 characters/i)
    ).toBeInTheDocument();

    expect(mockLoginUser).not.toHaveBeenCalled();
  });

  test("email with exactly 320 characters should be accepted", async () => {
    mockLoginUser.mockResolvedValueOnce();

    setup();

    const baseEmail = "a".repeat(310) + "@x.com";

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: baseEmail },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "validpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(mockLoginUser).toHaveBeenCalledWith(
        { email: baseEmail, password: "validpassword" },
        false
      );
      expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true });
    });
  });

  test("empty email should be rejected", async () => {
    setup();

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "validpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();

    expect(mockLoginUser).not.toHaveBeenCalled();
  });

  test("empty password should be rejected", async () => {
    setup();

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(
      await screen.findByText(/password is required/i)
    ).toBeInTheDocument();

    expect(mockLoginUser).not.toHaveBeenCalled();
  });

  test("empty email and empty password should be rejected", async () => {
    setup();

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/password is required/i)
    ).toBeInTheDocument();

    expect(mockLoginUser).not.toHaveBeenCalled();
  });

  test("clicking register button redirects to registration page", () => {
    setup();

    const registerButton = screen.getByText(/register/i);
    expect(registerButton).toBeInTheDocument();

    fireEvent.click(registerButton);

    expect(mockNavigate).toHaveBeenCalledWith("/auth/register");
  });
});
