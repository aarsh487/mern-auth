import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../store/useStore";
import { Otpbox } from "../components/Otpbox";
import { InputElement } from "../components/InputElement";
import { useRef } from "react";


export const ResetPassword = () => {
    const passwordRef = useRef<HTMLInputElement | null>();

    const { isLoading, error, resetPassword } = useStore();

    const { token } = useParams();

    const navigate = useNavigate();

    const handleResetPassword = () => {
        const password = passwordRef.current?.value;
        resetPassword(token, password);
    }

  return (
    <div className="flex flex-col gap-6 items-center text-lg">
        <div>
               <span>Enter the new password</span>
           </div>
           <div>
               <InputElement type={text} placeholder={"new password"} reference={passwordref} />
           </div>
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
}
