import { useRef } from "react";
import { InputElement } from "../components/InputElement"
import { useStore } from "../store/useStore"
import { useNavigate } from "react-router-dom";



export const ForgotPassword = () => {

    const emailRef = useRef<HTMLInputElement | null>();

    const { error, isLoading, forgotPassword } = useStore();
    const navigate = useNavigate();

    const handleForgotPassword = () => {
        const email = emailRef.current?.value || "";
        forgotPassword(email);
        navigate('/reset-password');
    }
  return (
     <div className="flex flex-col gap-6 items-center text-lg">
            <div>
                <span>Enter your email</span>
            </div>
            <div className="flex flex-col gap-6">
                <InputElement reference={emailRef} type={"text"} placeholder={"Email"} />
                <button onClick={handleForgotPassword} className="w-[318px] h-[40px] bg-black text-center text-white rounded-md">Send OTP</button>
            </div>
    
            {error && <p className="text-red-500 font-semibold mt-2"> {error} </p>}
    
            {isLoading ? "Verifying..." : ""}
    
        </div>
  )
}
