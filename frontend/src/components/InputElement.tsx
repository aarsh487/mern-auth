import { ReactElement } from "react";

interface InputElementInterface {
    type: string;
    placeholder: string;
    reference: any;
    iconOn?: ReactElement;
    iconOff?: ReactElement;

}

export const InputElement = ({ reference, type, placeholder }: InputElementInterface) => {
  return (
    <div className="">
        <input
            className="w-[318px] h-[37px] rounded-md bg-white border border-slate-300 p-3"
            type={type} 
            placeholder={placeholder}
            ref={reference}
        />        
    </div>
  )
}
