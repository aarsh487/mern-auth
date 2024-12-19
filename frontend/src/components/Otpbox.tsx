import React, { useEffect, useRef, useState } from "react";

interface OtpInputProps {
    length: number;
    onOtpSubmit: (otp: string) => void;
}

export const Otpbox: React.FC<OtpInputProps> = ({ length, onOtpSubmit }) => {
    const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const newOtp = [...otp];

        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        const combineOtp = newOtp.join("");
        if (combineOtp.length === length) onOtpSubmit(combineOtp);

        if (value && index < length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleClick = (index: number) => {
        inputRefs.current[index]?.setSelectionRange(1, 1);
        if (index > 0 && !otp[index - 1]) {
            inputRefs.current[otp.indexOf("")]?.focus();
          }
    };

    const handelKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key=== 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]){
            inputRefs.current[index - 1]?.focus();
        }
    };

    useEffect(() => {
        inputRefs.current[0]?.focus();
    },[])

    return (
        <div style={{ display: "flex", gap: "10px" }}>
            {otp.map((_, index) => (
                <input
                    key={index}
                    ref={(input) => (inputRefs.current[index] = input)}
                    maxLength={1}
                    value={otp[index]}
                    onChange={(e) => handleChange(index, e)}
                    onClick={() => handleClick(index)}
                    onKeyDown={(e) => handelKeyDown(index, e)}
                    style={{
                        width: "40px",
                        height: "40px",
                        textAlign: "center",
                        fontSize: "20px",
                    }}
                />
            ))}
        </div>
    );
};


