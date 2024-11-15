import { useNavigate } from "react-router-dom";

const AdminBar = ( {path} ) => {

    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-center mt-4 text-xl gap-7 text-white">
            <button
                className="bg-slate-500 p-1 px-2 rounded-md"
                onClick={()=>navigate("/admin/items")}
            >Edit Items</button>
            <button
                className="bg-slate-500 p-1 px-2 rounded-md"
                onClick={()=>navigate("/admin/users")}
            >Users</button>
        </div>
    )
}

export default AdminBar;