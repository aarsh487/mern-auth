import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/config';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if(!token){
        res.status(401).json({ success: false, message: "Unauthorized - Token not found" });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        if (!decoded) {
            res.status(401).json({ success: false, message: "Unauthorized - invalid token" })
            return;
        };
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log("Error in verifyToken ", error);
		res.status(500).json({ success: false, message: "Server error" });
    }
};