import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminBar from "../utils/AdminBar";
import { BASE_URL } from "../utils/Constants";


const EditItems =  () => {

    const location = useLocation();
    const path = location.pathname;
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [itemName, setItemName] = useState("");
    const [price, setPrice] = useState("");
    const [itemImage, setItemImage] = useState("");
    const [feed, setFeed] = useState(null);

    const getFeed = async () => {
        try {
            const response = await fetch(BASE_URL + "/items/getitems",{
                credentials: "include"
            })
            const data = await response.json();
            if(!response.ok) {
                setError(data.message);
            }
            setFeed(data.data);
        } catch (error) {
            setError(true);
            setErrorMessage(error.message);
        }
    }


    const handlePostItem = async () => {
        try {
            const response = await fetch(BASE_URL + "/items/postItem", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({itemName, price, itemImage}),
                credentials: "include"
            })
            const data = await response.json();
            setError(true);
            setErrorMessage(data.message);
            if(response.ok) {
                setFeed((prevFeed) => {
                    return [...prevFeed, data?.data]
                })
            }
        } catch (error) {
            setError(true);
            setErrorMessage(error.message);
        }
    }

    const DeleteItem = async (id) => {
        try {
            const response = await fetch(BASE_URL + `/items/deleteItem/${id}`,{
                method: "DELETE",
                credentials: "include"
            });
            if(response.ok) {
                setFeed(feed?.filter((item)=> {
                    return item._id != id;
                }))
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const inputChange = (setter) => {
        return (event) => {
            setter(event.target.value);
            if(error) {
                setError(false);
                setErrorMessage("");
            }
        }
    }

    useEffect(()=>{
        getFeed();
    },[]);


    return (
        <div>
            <AdminBar path = {path}/>
            <div className="flex flex-col items-center justify-center min-h-[550px]">
                <div className="flex flex-col gap-6 pb-[50px] px-[50px] rounded-md bg-gray-900 pt-[50px]">
                    <div className="p-2 text-white tex-2xl">
                        Add Item
                    </div>
                    <input 
                        className="p-3 min-w-[300px] rounded-md"
                        type="text"
                        placeholder="itemName"
                        value={itemName}
                        onChange={(e) => inputChange(setItemName)(e)}
                    />
                    <input
                        className="p-3  min-w-[300px] rounded-md"
                        type="text"
                        placeholder="price"
                        value={price}
                        onChange={(e) => inputChange(setPrice)(e)}
                    />
                    <input
                        className="p-3  min-w-[300px] rounded-md"
                        type="text"
                        placeholder="ItemImage"
                        value={itemImage}
                        onChange={(e) => inputChange(setItemImage)(e)}
                    />
                    <div>
                        {
                            error && <h1 className="bg-[#d44040] text-white text-center rounded-md p-2 text-xl">{errorMessage}</h1>
                        }
                    </div>
                    <button
                        className="text-xl bg-slate-200 mx-auto p-2 rounded-md mt-4"
                        onClick={()=>handlePostItem()}
                    >
                        Add Item
                    </button>
                </div>
            </div>
            <div className="flex items-center justify-center my-10">
                <div className="grid grid-cols-4 gap-[100px] gap-y-[100px] ">
                    {
                        feed?.map((item)=> {
                            return <div key={item._id} className="flex flex-col bg-gray-900 rounded-md shadow-2xl hover:cursor-pointer hover:scale-105 duration-300">
                                <img className="w-[250px] h-[250px] rounded-t-md " src={item.itemImage}/>
                                <div className="flex items-center justify-center text-white p-2 text-xl">
                                    <div>
                                        <h1>{item.itemName}</h1>
                                        <div className="flex">
                                            <h1>{"Price: \u20B9"}</h1>
                                            <h1>{item.price}</h1>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className="bg-[#d44040] mx-auto p-2 rounded-md mb-3 text-xl text-white"
                                    onClick={()=>DeleteItem(item._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export default EditItems;