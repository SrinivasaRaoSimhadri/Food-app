import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/Constants";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/userSlice";

const Login = () => {

    const [userName, setUserName] = useState("prabas_raju");
    const [password, setPassword] = useState("FoodApp@123");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const user = useSelector((store)=>store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const inputChange = (setter) => {
        return (event) => {
            setter(event.target.value);
            if(error) {
                setError(false);
                setErrorMessage("");
            }
        }
    }

    const handleLogin = async () => {
        try {
            const response = await fetch(BASE_URL + "/auth/login",{
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({userName, password}),
                credentials: "include"
            })
            const data = await response.json();
            setError(true);
            setErrorMessage(data?.message);
            if(response.ok) {
                dispatch(addUser(data?.data));
                return navigate("/items/getitems");
            }
        } catch (error) {
            setError(true);
            setErrorMessage(error.message);
        }
    }

    useEffect(()=> {
        if(user) {
            return navigate("/items/getitems");
        }
    },[user, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[700px]">
            <div className="flex flex-col gap-6 pb-[50px] px-[50px] rounded-md bg-gray-900 pt-[50px]">
                <div className="p-2 text-white tex-2xl">
                    Login
                </div>
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
                {
                    error && <h1 className="bg-[#d44040] text-white text-center rounded-md p-2 text-xl">{errorMessage}</h1>
                }
                <button
                    className="text-xl bg-slate-200 mx-auto p-2 rounded-md mt-4"
                    onClick={()=>handleLogin()}
                >
                    Login
                </button>
            </div>
        </div>
    )
}

export default Login;