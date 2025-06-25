import { Request, Response, NextFunction } from "express";

interface AttributeCheckOptions {
  attribute: string;
  value: any;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        attributes?: Record<string, any>;
        [key: string]: any;
      };
    }
  }
}

export const checkAttribute = ({ attribute, value }: AttributeCheckOptions) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    console.log("user in ABAC middleware:", req.user);
    console.log("ABAC check user:", req.user);

    const user = req.user;

    if (!user || !user.attributes) {
      res.status(403).json({ message: "User attributes not found." });
      return;
    }

    if (user.attributes[attribute] !== value) {
      res
        .status(403)
        .json({ message: "Access denied: insufficient attributes." });
      return;
    }

    next();
  };
};
