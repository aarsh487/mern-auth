import { Request, Response } from "express";
import { z } from 'zod';
import { UserModel } from "../models/user.model";
import bcrypt from 'bcrypt';
import { generateTokenAndSetCookies } from "../utils/generateTokenAndSetCookies";
import { ResolvePathType } from "mongoose/types/inferschematype";

export const signup = async(req: Request, res: Response) => {
    const signupSchema = z.object({
        email: z.string().email("Invalid email address"),
        password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/\d/, "Password must contain at least one digit")
        .regex(/[@$!%*?&#]/, "Password must contain at least one special character"),
        name: z.string(),
        confirmPassword: z.string()
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["ConfirmPassword"]
    });
    
    try {
        const request = signupSchema.parse({ ...req.body });

        const userAlreadyExists = await UserModel.findOne({
            email: request.email
        });
        if(userAlreadyExists){
            res.status(400).json({ success: false, message: "User already exists" });
            return;
        }
        const hashedPassword = await bcrypt.hash(request.password, 10)
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = await UserModel.create({
            email: request.email,
            password: hashedPassword,
            name: request.name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        });

        generateTokenAndSetCookies(res, user._id as string);
        const userObject = user.toObject();
        const { password, ...userWithoutPassword } = userObject;
        res.status(201).json({ 
            success: true, 
            message: "User created successfullt",  
            userWithoutPassword
        });
    } catch (error) {
        if( error instanceof z.ZodError){
            const errors = error.issues.map((err) => ({
                path: err.path.join("."),
                message: err.message,
            }));
            res.status(400).json({ errors, message: error.message });
        } else{
            console.log("Error while signup:", error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }
};

export const verifyEmail = async(req: Request, res: Response) => {
    const verifyCodeSchema = z.object({
        verificationToken: z.string().min(6)
    });

    try {
        const request = verifyCodeSchema.parse({ ...req.body });
        const user = await UserModel.findOne({
            verificationToken: request.verificationToken,
            verificationTokenExpiresAt: { $gt: Date.now() }
        });

        if(!user){
            res.status(400).json({ success: false, message: "Invalid or expired verification code" })
            return;
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;

        await user.save();

        const userObject = user.toObject();
        const { password, ...userWithOutPassword } = userObject;
        console.log(userWithOutPassword);

        res.status(200).json({ 
            success: true, 
            message: "Email verified successfully", 
            userWithOutPassword 
        })
    } catch (error) {
        if( error instanceof z.ZodError){
            const errors = error.issues.map((err) => ({
                path: err.path.join("."),
                message: err.message,
            }));
            res.status(400).json({ errors, message: error.message });
        } else{
            console.log("Error while verification:", error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }
};

export const login = async(req: Request, res: Response) => {
    const loginSchema = z.object({
        email: z.string().email("Invalid email address"),
        password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/\d/, "Password must contain at least one digit")
        .regex(/[@$!%*?&#]/, "Password must contain at least one special character"),
    });
    try {
        const request = loginSchema.parse({
            ...req.body
        });

        const user = await UserModel.findOne({ email: request.email });
        if(!user){
            res.status(400).json({ success: false, message: "Invalid credentials" });
            return;
        }

        const isPasswordValid = await bcrypt.compare(request.password, user.password);
        if(!isPasswordValid){
            res.status(400).json({ success: false, message: "Invalid credentials" });
            return;
        }

        generateTokenAndSetCookies(res, user._id as string);

        user.lastLogin = new Date();
        await user.save();

        const userObject = user.toObject();
        const { password, ...userWithOutPassword } = userObject;
        console.log(userWithOutPassword);

        res.status(200).json({ 
            success: true, 
            message: "Logged in successfully", 
            userWithOutPassword 
        });
    } catch (error) {
        if( error instanceof z.ZodError){
            const errors = error.issues.map((err) => ({
                path: err.path.join("."),
                message: err.message,
            }));
            res.status(400).json({ errors, message: error.message });
        } else{
            console.log("Error while login:", error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }
};

export const logout = async(req: Request, res: Response) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const forgotPassword = async(req: Request, res: Response) => {
    const forgotPasswordSchema = z.object({
        email: z.string().email("Invalid email address"),
    });
    try {
        const request = forgotPasswordSchema.parse({
            ...req.body
        });

        const user = await UserModel.findOne({
            email: request.email
        });

        if(!user){
            res.status(400).json({ success: false, message: "User not found" });
            return;
        };

        // generate resetPassword token 

    } catch (error) {
        if( error instanceof z.ZodError){
            const errors = error.issues.map((err) => ({
                path: err.path.join("."),
                message: err.message,
            }));
            res.status(400).json({ errors, message: error.message });
        } else{
            console.log("Error while Forgot password:", error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }
};


export const resetPassword = async(req: Request, res: Response) => {
    
}