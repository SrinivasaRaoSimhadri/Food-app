import { useLocation } from "react-router-dom";
import AdminBar from "../utils/AdminBar";
import { BASE_URL } from "../utils/Constants";
import { useEffect, useState } from "react";

const Users = () => {
    const location = useLocation();
    const path = location.pathname;
    const [users, setUsers] = useState([]);

    const GetUsers = async () => {
        try {
            const response = await fetch(BASE_URL + "/admin/users",{
                method: "GET",
                credentials: "include"
            })
            if(!response.ok) {
                throw new Error("Error in fetching the users");
            }
            const data = await response.json();
            setUsers(data.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(()=>{
        GetUsers();
    },[]);

    return (
        <div>
            <AdminBar path={path}/>
            <div className="flex flex-col my-4 items-center">
                {
                    users?.map((user) => {
                        return (
                            <div className="flex gap-10 min-w-[500px] p-3 text-white text-xl rounded-md my-3 bg-gray-900 hover:scale-105 duration-300">
                                <img className="w-[70px] h-[70px] rounded-full" src={user.photoUrl}/>
                                <div className="flex flex-col justify-between">
                                    <div className="flex gap-5">
                                        <h1>Name: </h1>
                                        <h1>{user.fullName}</h1>
                                    </div>
                                    <div className="flex gap-5">
                                        <h1>userName: </h1>
                                        <h1>{user.userName}</h1>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Users;