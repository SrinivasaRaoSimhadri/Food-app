import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/Constants";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../store/userSlice";

const NavBar = () => {

    const user = useSelector((store)=>store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const LogoutUser = async () => {
        try {
            const response = await fetch(BASE_URL + "/auth/logout",{
                method: "POST",
                credentials: "include"
            })
            if(response.ok) {
                dispatch(removeUser());
                return navigate("/auth/login");
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="flex items-center justify-between px-9 py-2 bg-slate-200 text-xl shadow-xl text-white">
            <div className="flex gap-6 items-center justify-center">
                <div>
                    {
                        user &&
                        <img 
                            src={user?.photoUrl} className="h-[50px] w-[50px] rounded-full cursor-pointer"
                            onClick={()=>navigate("/profile")}
                        />
                    }
                </div>
                <div>
                    {
                        user && <button 
                            className="bg-slate-500 p-1 px-2 rounded-md"
                            onClick={()=>navigate("/items/getitems")}
                        >
                            Food Villa
                        </button>
                    }
                </div>
            </div>
            <div className="flex gap-7">
                {
                    user?.isAdmin && <button
                        className="bg-slate-500 p-1 px-2 rounded-md"
                        onClick={()=>navigate("/admin/items")}
                    >DashBoard</button>
                }
                {
                    user && <button 
                        className="bg-slate-500 p-1 px-2 rounded-md"
                        onClick={()=>navigate("/orders")}
                    >
                        Orders
                    </button>
                }
                {
                    user && <button
                        className="bg-slate-500 p-1 px-2 rounded-md"
                        onClick={()=>navigate("/cart/getcart")}
                    >
                        Cart
                    </button>
                }
                <div>
                    {
                        !user && 
                        <button
                            className="bg-slate-500 p-1 px-2 rounded-md"
                            onClick={()=>navigate("/auth/signup")}
                        >
                            Signup
                        </button>
                    }
                </div>
                <div>
                    {
                        user && 
                        <button
                            className="bg-slate-500 p-1 px-2 rounded-md"
                            onClick={()=> LogoutUser()}
                        >Logout</button>
                    }
                    {
                        !user && 
                        <button
                            className="bg-slate-500 p-1 px-2 rounded-md"
                            onClick={()=>navigate("/auth/login")}
                        >Login</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default NavBar;