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
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.body.user || req.user; // u realnosti dolazi iz JWT-a ili sesije

    if (!user || !user.attributes) {
      return res.status(403).json({ message: "User attributes not found." });
    }

    if (user.attributes[attribute] !== value) {
      return res
        .status(403)
        .json({ message: "Access denied: insufficient attributes." });
    }

    next();
  };
};
