import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../Login";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import api from "../../api/axios";

import { vi, describe, it, beforeEach, expect } from "vitest";

vi.mock("../../api/axios"); // ispravljen path ako je root `src/`

describe("Login Page", () => {
  const mockSetUser = vi.fn();

  const renderLogin = () =>
    render(
      <BrowserRouter>
        <AuthContext.Provider
          value={{
            setUser: mockSetUser,
            user: null,
            isAuthenticated: false,
            login: vi.fn(),
            logout: vi.fn(),
          }}
        >
          <Login />
        </AuthContext.Provider>
      </BrowserRouter>
    );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders login elements", () => {
    renderLogin();
    expect(screen.getByTestId("login-title")).toBeInTheDocument();
    expect(screen.getByTestId("username-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("login-button")).toBeInTheDocument();
  });

  it("calls API and sets user on successful login", async () => {
    // Type assertion fix
    const mockedPost = api.post as unknown as ReturnType<typeof vi.fn>;

    mockedPost.mockResolvedValue({
      data: {
        token: "123",
        user: { attributes: { role: "admin" } },
      },
    });

    renderLogin();

    fireEvent.change(screen.getByTestId("username-input"), {
      target: { value: "admin_user" },
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "adminpass" },
    });

    fireEvent.click(screen.getByTestId("login-button"));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith("/auth/login", {
        username: "admin_user",
        password: "adminpass",
      });
      expect(mockSetUser).toHaveBeenCalledWith({ role: "admin" });
    });
  });
});
