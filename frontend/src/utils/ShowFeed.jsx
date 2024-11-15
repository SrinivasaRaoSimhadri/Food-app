import { useEffect, useState } from "react";
import { BASE_URL } from "./Constants";
import Banner from "./Banner";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShowFeed = () => {


    const [feed, setFeed] = useState(null);
    const [cart, setCart] = useState(null);

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
            console.log(error.message);
        }
    }

    const AddToCart = async (id) => {
        try {
            const response = await fetch(BASE_URL + `/cart/add/${id}`, {
                method: "POST",
                credentials: "include"
            });
            if(response.ok) {
                toast.success("Item Added to cart Successfully.", {
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(()=>{
        getFeed();
    },[]);

    return (
        <>
            <Banner/>
            <div className="flex items-center justify-center my-10">
                <div className="grid grid-cols-4 gap-[100px] gap-y-[100px] ">
                    {
                        feed?.map((item)=> {
                            return <div key={item._id} className="flex flex-col bg-gray-900 rounded-md shadow-2xl hover:scale-105 duration-300">
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
                                    className="flex items-center justify-center my-4 gap-6 bg-gray-700 p-2 px-3 mx-auto rounded-[80px] text-white text-xl"
                                    onClick={() => AddToCart(item._id)}
                                >
                                    Add To Cart
                                </button>
                            </div>
                        })
                    }
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default ShowFeed;