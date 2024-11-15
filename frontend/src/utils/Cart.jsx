import { useEffect, useState } from "react";
import {useSelector} from "react-redux"
import { BASE_URL, RAZORPAY_KEY_ID } from "./Constants";

const Cart = () => {

    const [cart, setCart] = useState(null);
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [postalPin, setPostalPin] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(""); 
    const [address, setAddress] = useState(null);
    const user = useSelector((state) => state.user);
    
    const inputChange = (setter) => {
        return (event) => {
            setter(event.target.value);
            if(error) {
                setError(false);
                setErrorMessage("");
            }
        }
    }

    const getCart = async () => {
        try {
            const response = await fetch(BASE_URL + "/cart/getcart",{
                credentials: "include"
            })
            if(response.ok) {
                const data = await response.json();
                setCart(data.data);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const AddOrRemove = async (flag, id) => {
        try {
            const response = await fetch(BASE_URL + `/cart/${flag}/${id}`,{
                method: "POST",
                credentials: "include"
            });
            if(response.ok) {
                const data = await response.json();
                setCart(data.data);
            }
        } catch (error) {
            console.log(error.message);   
        }
    }

    const GetAddress = async () => {
        try {
            const response = await fetch(BASE_URL + "/address/getaddress", {
                credentials: "include"
            });
            if(response.ok) {
                const data = await response.json();
                setAddress(data.data);
                setStreet(data.data.street);
                setCity(data.data.city);
                setState(data.data.state);
                setCountry(data.data.country);
                setPostalPin(data.data.postalPin);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const Addaddress = async () => {
        try {
            const response = await fetch(BASE_URL + "/address/addaddress", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    street,
                    city,
                    state,
                    country,
                    postalPin
                }),
                credentials: "include"
            })
            if(response.ok) {
                const data = await response.json();
                setAddress(data.data);
                setStreet(data.data.street);
                setCity(data.data.city);
                setState(data.data.state);
                setCountry(data.data.country);
                setPostalPin(data.data.postalPin);
                setError(true);
                setErrorMessage(data.message);
            }
        } catch (error) {
            setError(true);
            setErrorMessage(error.message);
        }
    }


    const payNow = async () => {
        try {
          console.log(cart?.totalPrice);
            const response = await fetch(BASE_URL + '/payments/create-order', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: cart?.totalPrice, currency: 'INR', receipt: 'receipt#1', notes: {} }),
                credentials: "include"
            });
    
          const order = await response.json();
    
          const options = {
            key: RAZORPAY_KEY_ID, 
            amount: order.amount, 
            currency: 'INR',
            name: "Food Villa",
            description: 'Test Transaction',
            order_id: order.id, 
            callback_url: BASE_URL + '/payments/payment-success',
            prefill: {
              name: user?.fullName,
              email: 'test@example.com',
              contact: 'xxxxxxxxxx',
            },
            theme: {
              color: '#111827',
            },
          };
    
          const rzp = new window.Razorpay(options);
          rzp.open();
        } catch (error) {
          console.error('Error creating order:', error);
        }
      };

    
    useEffect(() => {
        getCart();
        GetAddress();
    },[]);

    return (
        <div className="grid grid-cols-12 gap-3 mt-5">
            <div className="col-span-4">
                <div className="flex flex-col items-center justify-center min-h-[700px]">
                    <div className="flex flex-col gap-6 pb-[50px] px-[50px] rounded-md bg-gray-900 pt-[50px]">
                        <div className="p-2 text-white tex-2xl">
                            Address
                        </div>
                        <input 
                            className="p-3 min-w-[300px] rounded-md"
                            type="text"
                            placeholder="street"
                            value={street}
                            onChange={(e) => inputChange(setStreet)(e)}
                        />
                        <input 
                            className="p-3 min-w-[300px] rounded-md"
                            type="text"
                            placeholder="city"
                            value={city}
                            onChange={(e) => inputChange(setCity)(e)}
                        />
                        <input 
                            className="p-3 min-w-[300px] rounded-md"
                            type="text"
                            placeholder="state"
                            value={state}
                            onChange={(e) => inputChange(setState)(e)}
                        />
                        <input 
                            className="p-3 min-w-[300px] rounded-md"
                            type="text"
                            placeholder="country"
                            value={country}
                            onChange={(e) => inputChange(setCountry)(e)}
                        />
                        <input 
                            className="p-3 min-w-[300px] rounded-md"
                            type="text"
                            placeholder="postalPin"
                            value={postalPin}
                            onChange={(e) => inputChange(setPostalPin)(e)}
                        />
                        {
                            error && <h1 className="bg-[#d44040] text-white text-center rounded-md p-2 text-xl">{errorMessage}</h1>
                        }
                        <button
                            className="text-xl bg-slate-200 mx-auto p-2 rounded-md mt-4"
                            onClick={()=>Addaddress()}
                        >
                            {
                                !address && "Add Address"
                            }
                            {
                                address && "Edit Address"
                            }
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-span-8 mr-4">
                <table className="text-left w-full bg-gray-300 rounded-md">
                    <thead className="border-b-8 bg-gray-400">
                        <tr className="">
                            <th className="text-center px-4 py-2">Image</th>
                            <th className="text-center px-4 py-2">Item Name</th>
                            <th className="text-center px-4 py-2">Price</th>
                            <th className="text-center px-4 py-2">Quantity</th>
                            <th className="text-center px-4 py-2">Item Price</th>
                            <th className="text-center px-4 py-2">Add/Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart?.items?.map((item, index) => {
                                return (
                                    <tr key={index} className="border-b">
                                        <td className="flex items-center justify-center px-4 py-2">
                                            <img className="w-[80px] h-[80px] rounded-md" src={item.itemId.itemImage} alt="Item"/>
                                        </td>
                                        <td className="px-4 py-2 text-center">{item.itemId.itemName}</td>
                                        <td className="px-4 py-2 text-center">{"\u20B9" + " " + item.itemId.price}</td>
                                        <td className="px-4 py-2 text-center">{item.quantity}</td>
                                        <td className="px-4 py-2 text-center">{item.quantity * item.itemId.price}</td>
                                        <td>
                                            <div className="flex items-center justify-center gap-2 p-2 rounded-md">
                                                <button 
                                                    className="rounded-full"
                                                    onClick={()=> AddOrRemove("add",  item.itemId._id)}
                                                >
                                                    <img src="/add_icon_green.png"/>
                                                </button>
                                                <button 
                                                    className="rounded-full"
                                                    onClick={() => AddOrRemove("remove", item.itemId._id)}
                                                >
                                                    <img src="/remove_icon_red.png"/>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <div className="flex justify-end w-full">
                    {
                        cart?.totalPrice > 0 && 
                        <div className="flex items-center mt-4 bg-gray-400 p-4 gap-5 rounded-md my-5">
                            <h1 className="text-end text-xl">{"Total: \u20B9" + cart?.totalPrice}</h1>
                            <button 
                                className="bg-gray-900 text-white text-xl p-2 rounded-md"
                                onClick={()=>payNow()}
                            >
                                pay through razorpay
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Cart;