import { useRef } from "react";
import { InputElement } from "../components/InputElement"
import { useStore } from "../store/useStore";

export const Login = () => {

  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const { login } = useStore();

  const handleLogin = () => {
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    login(email, password);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="w-[444px] h-20 rounded-t-2xl bg-white">
        <h2 className="text-center font-semibold mt-6 text-lg">Auhenticate</h2>
      </div>
      <div className="w-[446px] h-[380px] bg-slate-50 border border-slate-300 flex items-center justify-center rounded-b-2xl">
        <div className="flex flex-col gap-4">
          <InputElement reference={emailRef} type={"text"} placeholder={"Email"} />
          <InputElement reference={passwordRef} type={"password"} placeholder={"Password"} />
          <button onClick={handleLogin} className="w-[318px] h-[40px] bg-black text-white rounded-md p-2">Sign In</button>
          <span className="text-center text-sm">Dont't have an acoount?
            <a className="pl-1 underline text-purple-700" href="/signup">Sign up</a>
          </span>
        </div>
      </div>
    </div>
  )
};
