import { useState } from "react";
import { BASE_URL } from "../utils/Constants";

const Register = () => {

    const [fullName, setFullName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const inputChange = (setter) => {
        return (event) => {
            setter(event.target.value);
            if(error) {
                setError(false);
                setErrorMessage("");
            }
        }
    }

    const handleSignup = async () => {
        try {
            const response = await fetch(BASE_URL + "/auth/signup",{
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    fullName, 
                    userName, 
                    password,
                    confirmPassword
                })
            })
            const data = await response.json();
            setError(true);
            setErrorMessage(data?.message);
        } catch (error) {
            setError(true);
            setErrorMessage(error.message);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[700px]">
            <div className="flex flex-col gap-6 pb-[50px] px-[50px] rounded-md bg-gray-900 pt-[50px]">
                <div className="p-2 text-white tex-2xl">
                    SignUp
                </div>
                <input 
                    className="p-3 min-w-[300px] rounded-md"
                    type="text"
                    placeholder="fullName"
                    value={fullName}
                    onChange={(e) => inputChange(setFullName)(e)}
                />
                <input 
                    className="p-3 min-w-[300px] rounded-md"
                    type="text"
                    placeholder="userName"
                    value={userName}
                    onChange={(e) => inputChange(setUserName)(e)}
                />
                <input
                    className="p-3  min-w-[300px] rounded-md"
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => inputChange(setPassword)(e)}
                />
                <input 
                    className="p-3 min-w-[300px] rounded-md"
                    type="password"
                    placeholder="confirm password"
                    value={confirmPassword}
                    onChange={(e) => inputChange(setConfirmPassword)(e)}
                />
                {
                    error && <h1 className="bg-[#d44040] text-white text-center rounded-md p-2 text-xl">{errorMessage}</h1>
                }
                <button
                    className="text-xl bg-slate-200 mx-auto p-2 rounded-md mt-4"
                    onClick={()=>handleSignup()}
                >
                    SignUp
                </button>
            </div>
        </div>
    )
}

export default Register;