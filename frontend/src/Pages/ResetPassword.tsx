import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../store/useStore";
import { InputElement } from "../components/InputElement";
import { useRef } from "react";
import { PasswordInput } from "../components/PasswordInput";


export const ResetPassword = () => {
    const passwordRef = useRef<HTMLInputElement | null>();
    const confirmPasswordRef = useRef<HTMLInputElement | null>();

    const { isLoading, error, resetPassword } = useStore();

    const { token } = useParams();

    const navigate = useNavigate();

    const handleResetPassword = () => {
        const password = passwordRef.current?.value || "";
        resetPassword(token as string, password);
        navigate('/login')
    }

  return (
    <div className="flex flex-col gap-6 items-center text-lg">
        <div>
               <span>Enter the new password</span>
           </div>
           <div>
               <InputElement type={"text"} placeholder={"new password"} reference={passwordRef} />
           </div>
           <div>
               <span>Confirm password</span>
           </div>
           <div>
               <PasswordInput type={"text"} placeholder={"Confirm Password"} reference={confirmPasswordRef} />
           </div>
   
           {error && <p className="text-red-500 font-semibold mt-2"> {error} </p>}
   
           {isLoading ? "Verifying..." : ""}

           <button onClick={handleResetPassword} className="w-[318px] h-[40px] bg-black text-center text-white rounded-md">Reset Password</button>
   
       </div>
  )
}
