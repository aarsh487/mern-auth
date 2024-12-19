import { useNavigate } from "react-router-dom";
import { Otpbox } from "../components/Otpbox"
import { useStore } from "../store/useStore";

export const EmailVerifcation = () => {

    const { isLoading, error, verifyEmail } = useStore();

    const navigate = useNavigate();

    const handleOtpSubmit = async(token: string) => {
        await verifyEmail(token);
        navigate('/')
    };
  return (
    <div className="flex flex-col gap-6 items-center text-lg">
        <div>
            <span>Enter the OTP sent to your email</span>
        </div>
        <div>
            <Otpbox length={6} onOtpSubmit={(token) => handleOtpSubmit(token)}/>
        </div>

        {error && <p className="text-red-500 font-semibold mt-2"> {error} </p>}

        {isLoading ? "Verifying..." : ""}

    </div>
  )
};
