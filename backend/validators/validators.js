export const validateUserLoginDetails = (req) => {
    const { userName, password } = req.body;
    if(!userName || !password) {
        throw new Error("Invalid credintials");
    }
    else if(!userName.trim() || !password.trim()) {
        throw new Error("Invalid credintials");
    }
}

export const validateUserSignupDetails = (req)=>{
    const { fullName, userName, password, confirmPassword } = req.body;
    if(!fullName || !userName || !password || !confirmPassword) {
        throw new Error("Enter valid details");
    }
    else if(!fullName.trim() || !userName.trim() || !password.trim() || !confirmPassword.trim()) {
        throw new Error("Enter valid details");
    }
    else if(password != confirmPassword) {
        throw new Error("Password not matching");
    }
}

export const validateItemDetails = (req) => {
    const { itemName, price, itemImage } = req.body;
    if(!itemName || !price || !itemImage) {
        throw new Error("Enter valid item details");
    } else if(!itemName.trim() || !price.trim() || !itemImage.trim()) {
        throw new Error("Enter valid item details");
    }
}

export const validateEditProfile = (req) => {
    const { fullName, userName, photoUrl } = req.body;
    if(!fullName || !userName || !photoUrl) {
        throw new Error("Enter valid user details");
    } else if(!fullName.trim() || !userName.trim() || !photoUrl.trim()) {
        throw new Error("Enter valid user details");
    }
}

export const validateAddressData = (req) => {
    const { street, city, state, country, postalPin } = req.body;
    if(!street || !city || !state || !country || !postalPin) {
        throw new Error("Enter valid address");
    } else if(!street.trim() || !city.trim() || !state.trim() || !country.trim() || !postalPin.trim()) {
        throw new Error("Enter valid address");
    }
}