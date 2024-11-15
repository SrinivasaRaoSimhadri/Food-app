import NavBar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { BASE_URL } from "../utils/Constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/userSlice";

const Body = () => {

    const dispatch = useDispatch();
    const user = useSelector((store)=>store.user);

    const getProfile =async () => {
        try {
            const response = await fetch(BASE_URL + "/profile",{
                credentials:"include"
            });
            if(response.ok) {
                const data = await response.json();
                dispatch(addUser(data.data));
            }
            return ("/auth/login")
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(()=> {
        if(!user) {
            getProfile();
        }
    },[]);

    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />
            <div className="flex-grow">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Body;