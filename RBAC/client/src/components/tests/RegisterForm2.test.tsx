import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import axios from "axios";
import RegisterForm from "../RegisterForm";
import { AuthContext, type AuthContextType } from "../../context/AuthContext";

vi.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const mockAuth = {
    user: null,
    token: null,
    login: vi.fn(),
    logout: vi.fn(),
    isAuthenticated: false,
  };

  return (
    <AuthContext.Provider value={mockAuth as AuthContextType}>
      <BrowserRouter>{children}</BrowserRouter>
    </AuthContext.Provider>
  );
};

describe("RegisterForm", () => {
  it("renders inputs and register button", () => {
    render(<RegisterForm />, { wrapper: Wrapper });

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/role/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
  });

  it("updates input values and submits the form", async () => {
    const token = "mocked-token";
    mockedAxios.post.mockResolvedValueOnce({ data: { token } });

    render(<RegisterForm />, { wrapper: Wrapper });

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "maksim" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "pass123" },
    });
    fireEvent.change(screen.getByLabelText(/role/i), {
      target: { value: "user" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        "http://localhost:5000/api/auth/register",
        {
          username: "maksim",
          password: "pass123",
          role: "user",
        }
      );
    });
  });
});
