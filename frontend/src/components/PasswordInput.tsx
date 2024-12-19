import { ReactElement, useState } from "react";

interface InputElementInterface {
    type: string;
    placeholder: string;
    reference: any;
    iconOn?: ReactElement;
    iconOff?: ReactElement;
}

export const PasswordInput = ({ iconOn, iconOff, reference, type, placeholder }: InputElementInterface) => {
  const [ isPassword, setIsPassword ] = useState(false);
  return (
    <div className="">
        <input
            className="w-[318px] h-[37px] rounded-md bg-white border border-slate-300 p-3"
            type={ isPassword ? type : "password"} 
            placeholder={placeholder}
            ref={reference}
        />
        <div onClick={() => setIsPassword(!isPassword)} className="fixed mx-72 -my-6 cursor-pointer">
          {isPassword ? iconOn : iconOff }
        </div>        
    </div>
  )
};