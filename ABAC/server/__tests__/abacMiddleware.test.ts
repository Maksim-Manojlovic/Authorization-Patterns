import { Request, Response, NextFunction } from "express";
import { checkAttribute } from "../src/middleware/abacMiddleware";

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe("checkAttribute middleware", () => {
  it("should allow request when attribute matches", () => {
    const req = {
      user: { attributes: { role: "admin" } },
    } as Partial<Request> as Request;

    const res = mockResponse();
    const next = jest.fn() as NextFunction;

    checkAttribute({ attribute: "role", value: "admin" })(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it("should deny request when attribute does not match", () => {
    const req = {
      user: { attributes: { role: "user" } },
    } as Partial<Request> as Request;

    const res = mockResponse();
    const next = jest.fn() as NextFunction;

    checkAttribute({ attribute: "role", value: "admin" })(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      message: "Access denied: insufficient attributes.",
    });
  });

  it("should deny request when no attributes", () => {
    const req = { user: {} } as Request;
    const res = mockResponse();
    const next = jest.fn() as NextFunction;

    checkAttribute({ attribute: "role", value: "admin" })(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
  });

  it("should deny request when no user object", () => {
    const req = {} as Request;
    const res = mockResponse();
    const next = jest.fn() as NextFunction;

    checkAttribute({ attribute: "role", value: "admin" })(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
  });
});
