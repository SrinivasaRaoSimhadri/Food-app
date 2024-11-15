import { useEffect, useState } from "react";
import { BASE_URL } from "./Constants";

const OrderHistory = () => {

    const [orderHistory, setOrderHistory] = useState(null);
    const getOrdersHistory  = async () => {
        try {
            const response = await fetch(BASE_URL + "/orders", {
                credentials: "include"
            })
            if(response.ok) {
                const data = await response.json();
                setOrderHistory(data.data);
            }
        } catch (error) {
            console.log(error.message);   
        }
    }

    useEffect(() => {
        getOrdersHistory();
    },[]);

    return (
        <div className="flex items-center justify-center h-full">
            <div>
                {
                    !orderHistory && 
                    <h1 className="bg-gray-400 p-2 min-w-[200px] max-w-[200px] text-center mt-4 rounded-md text-xl">No Orders yet!</h1>
                }
            </div>
            <div className="flex items-center justify-center mt-7">
                {
                    orderHistory && 
                    <table className="text-left w-full bg-gray-300 rounded-md">
                        <thead className="border-b-8 bg-gray-400">
                            <tr className="">
                                <th className="text-center px-4 py-2">Ordered Date</th>
                                <th className="text-center px-4 py-2">Items count</th>
                                <th className="text-center px-4 py-2">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orderHistory?.map((order) => {
                                    return (
                                        <tr key={order._id} className="border-b">
                                            <td className="px-4 py-2 text-center">{order.createdAt.split("T")?.[0]}</td>
                                            <td className="px-4 py-2 text-center">{order.items.length}</td>
                                            <td className="px-4 py-2 text-center">{"\u20B9" + " " + order.totalPrice}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                }
            </div>
        </div>

    )
}

export default OrderHistory;