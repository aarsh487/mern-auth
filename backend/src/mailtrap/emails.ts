import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailoTemplate";
import { mailtrapClient, sender } from "./mailtrap.config";


export const sendVerificationEmail = async(email: string, verificationToken: string ) => {
    const recipient = [{ email }];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        });

        console.log("Email sent successfully", response);
    } catch (error) {
        console.log("Error sending verification", error);
        throw new Error("Error sending verification email" + error);
    }
};

export const sendPasswordResetEmail = async(email: string, resetUrl: string ) => {
    const recipient = [{ email }];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
            category: "Password Reset"
        });

        console.log("Email sent successfully", response);
    } catch (error) {
        console.log("Error sending password reset email", error);
        throw new Error("Error sending verification email" + error);
    }
};

export const sendResetSuccessEmail = async(email: string ) => {
    const recipient = [{ email }];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset"
        });

        console.log("Password reset email sent successfully", response);
    } catch (error) {
        console.log("Error sending password reset success email", error);
        throw new Error("Error sending password reset success email" + error);
    }
};

