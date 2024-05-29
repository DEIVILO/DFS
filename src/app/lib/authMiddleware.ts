import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import jwt from "jsonwebtoken";

const authMiddleware = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
      (req as any).user = decoded;
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};

export default authMiddleware;
