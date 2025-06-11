import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import RegisterForm from "../RegisterForm";

// Wrapper with AuthProvider + Router
const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <AuthProvider>{children}</AuthProvider>
  </BrowserRouter>
);

describe("RegisterForm", () => {
  it("renders all inputs and button", () => {
    render(<RegisterForm />, { wrapper: Wrapper });

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/role/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
  });

  it("updates inputs correctly", () => {
    render(<RegisterForm />, { wrapper: Wrapper });

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const roleSelect = screen.getByLabelText(/role/i);

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "pass123" } });
    fireEvent.change(roleSelect, { target: { value: "admin" } });

    expect(usernameInput).toHaveValue("testuser");
    expect(passwordInput).toHaveValue("pass123");
    expect(roleSelect).toHaveValue("admin");
  });
});
