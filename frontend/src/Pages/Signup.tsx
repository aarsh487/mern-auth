import { useRef } from "react";
import { InputElement } from "../components/InputElement"
import { useStore } from "../store/useStore";
import { IoEye, IoEyeOff  } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { PasswordInput } from "../components/PasswordInput";


export const Signup = () => {

  const nameRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const consfirmPasswordRef = useRef<HTMLInputElement>();

  const { signup } = useStore();
  const navigate = useNavigate();

  const handleSignup = () => {
    const name = nameRef.current?.value || "";
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const confirmPassword = consfirmPasswordRef.current?.value || "";
    signup(name, email, password, confirmPassword);
    navigate('/verify-email');
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="w-[444px] h-20 rounded-t-2xl bg-white">
        <h2 className="text-center font-semibold mt-6 text-lg">Auhenticate</h2>
      </div>
      <div className="w-[446px] h-[380px] bg-slate-50 border border-slate-300 flex items-center justify-center rounded-b-2xl">
        <div className="flex flex-col gap-4">
          <InputElement 
            reference={nameRef} 
            type={"text"} 
            placeholder={"Name"} 
          />
          <InputElement 
            reference={emailRef} 
            type={"text"} 
            placeholder={"Email"} 
          />
          <PasswordInput 
            iconOff={<IoEyeOff />} 
            iconOn={<IoEye />} 
            reference={passwordRef} 
            type={"text"} 
            placeholder={"Password"} 
          />
          <PasswordInput 
            reference={consfirmPasswordRef} 
            type={"password"} 
            placeholder={"Confirm Password"} 
          />
          <button onClick={handleSignup} className="w-[318px] h-[40px] bg-black text-white rounded-md p-2">Sign Up</button>
          <span className="text-center text-sm">Already have an acoount?
            <Link className="pl-1 underline text-purple-700" to="/login">Sign in</Link>
          </span>
        </div>
      </div>
    </div>
  )
};
