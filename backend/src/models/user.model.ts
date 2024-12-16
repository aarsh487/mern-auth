import mongoose, { Schema, Document } from 'mongoose';

export interface UserDocument extends Document {
    email: string;
    password: string;
    name: string;
    lastLogin: Date;
    isVerified: boolean;
    resetPasswordToken: string;
    resetPasswordExpiresAt: Date;
    verificationToken?: string;
    verificationTokenExpiresAt?: Date;
};

const userSchema = new Schema<UserDocument>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    lastLogin: { type: Date, default: Date.now() },
    isVerified: { type: Boolean, default: false },
    resetPasswordToken: { type: String },
    resetPasswordExpiresAt: { type: Date },
    verificationToken: {type: String},
    verificationTokenExpiresAt: { type: Date }
}, {
    timestamps: true
});

export const UserModel = mongoose.model<UserDocument>('User', userSchema);