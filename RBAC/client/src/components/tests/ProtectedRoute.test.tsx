import React from "react";
import { render, screen } from "@testing-library/react";
import ProtectedRoute from "../../pages/ProtectedRoute";
import { AuthContext, type AuthContextType } from "../../context/AuthContext";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

// Custom provider with optional user
const CustomAuthProvider = ({
  children,
  user = null,
  token = null,
}: {
  children: React.ReactNode;
  user?: { username: string; role: string } | null;
  token?: string | null;
}) => {
  const mockAuth = {
    user,
    token,
    login: vi.fn(),
    logout: vi.fn(),
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={mockAuth as AuthContextType}>
      <MemoryRouter>{children}</MemoryRouter>
    </AuthContext.Provider>
  );
};

const TestContent = () => <div>Secure content visible</div>;

describe("ProtectedRoute", () => {
  it("allows access for authorized roles", () => {
    render(
      <CustomAuthProvider
        user={{ username: "admin", role: "admin" }}
        token="valid-token"
      >
        <ProtectedRoute allowedRoles={["admin"]}>
          <TestContent />
        </ProtectedRoute>
      </CustomAuthProvider>
    );

    expect(screen.getByText("Secure content visible")).toBeInTheDocument();
  });

  it("blocks access for unauthorized roles", () => {
    render(
      <CustomAuthProvider
        user={{ username: "guest", role: "guest" }}
        token="valid-token"
      >
        <ProtectedRoute allowedRoles={["admin"]}>
          <TestContent />
        </ProtectedRoute>
      </CustomAuthProvider>
    );

    expect(
      screen.queryByText("Secure content visible")
    ).not.toBeInTheDocument();
  });

  it("blocks access for unauthenticated users", () => {
    render(
      <CustomAuthProvider user={null} token={null}>
        <ProtectedRoute allowedRoles={["admin"]}>
          <TestContent />
        </ProtectedRoute>
      </CustomAuthProvider>
    );

    expect(
      screen.queryByText("Secure content visible")
    ).not.toBeInTheDocument();
  });
});
