import { useEffect, useState } from "react";
import { BASE_URL } from "./Constants";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";

const Profile = () => {

    const [fullName, setFullName] = useState("");
    const [userName, setUserName] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
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

    const getProfile = async () => {
        try {
            const response = await fetch(BASE_URL + "/profile",{
                credentials: "include"
            })
            if(response.ok) {
                const data = await response.json();
                setFullName(data?.data?.fullName);
                setUserName(data?.data?.userName);
                setPhotoUrl(data?.data?.photoUrl);
            }
        } catch (error) {
            setError(true);
            setErrorMessage(error.message);
        }
    }

    const EditProfile = async () => {
        try {
            const response = await fetch(BASE_URL + "/profile/edit",{
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    fullName,
                    userName,
                    photoUrl
                }),
                credentials: "include"
            })
            const data = await response.json();
            setError(true);
            setErrorMessage(data?.message);
            dispatch(addUser(data?.data));
        } catch (error) {
            setError(true);
            setErrorMessage(error.message);
        }
    }

    useEffect(()=> {
        getProfile();
    },[]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[700px]">
            <div className="flex flex-col items-center gap-6 pb-[50px] px-[50px] rounded-md bg-gray-900 pt-[50px]">
                <img src={photoUrl} className="h-[250px] w-[250px] rounded-full"/>
                <input 
                    className="p-3 min-w-[300px] rounded-md"
                    type="text"
                    placeholder="FullName"
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
                    className="p-3 min-w-[300px] rounded-md"
                    type="text"
                    placeholder="ProfilePic"
                    value={photoUrl}
                    onChange={(e) => inputChange(setPhotoUrl)(e)}
                />
                <div>
                    {
                        error && <h1 className="bg-[#d44040] text-white text-center rounded-md p-2 text-xl">{errorMessage}</h1>
                    }
                </div>
                <button
                    className="text-xl bg-slate-200 mx-auto p-2 rounded-md mt-4"
                    onClick={()=>EditProfile()}
                >
                    Edit Profile
                </button>
            </div>
        </div>
    )
}

export default Profile;