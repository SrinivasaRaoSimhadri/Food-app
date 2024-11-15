const Banner = () => {
    return (
        <div className="flex text-white justify-between p-6 bg-gray-900 mt-10 rounded-md mr-2 ml-2">
            <div className="p-14">
                <h1 className="text-xl">A joyful explosion of flavors in every bite!</h1> 
                <h1 className="text-xl">Our aromatic, perfectly spiced biryani brings together tender meat and fragrant rice,</h1>
                <h1 className="text-xl">creating a deliciously unforgettable experience.</h1> 
                <h1 className="text-2xl mt-8 text-[#d44040]">Every meal at Food Villa is a celebration of taste, tradition, and happiness!</h1>
            </div>
            <div>
                <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGWHHxkj3BoTzDaAGw3aKfOvODFVn60IC2AA&s"
                    className="rounded-md h-[300px] w-[600px] hover:scale-105 duration-300"
                />
            </div>
        </div>
    )
}

export default Banner;