import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Body from "./layout/Body";
import ShowFeed from "./utils/ShowFeed";
import Login from "./auth/Login";
import Register from "./auth/Register";
import appStore from "./store/appStore";
import Profile from "./utils/Profile";
import EditItems from "./admin/EditItems";
import Users from "./admin/Users";
import OrderHistory from "./utils/OrderHistory";
import Cart from "./utils/Cart";

const App = () => {
    return (
        <Provider store={appStore}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Body/>}>
                        <Route index element={<Navigate to="/auth/login"/>}/>
                        <Route path="profile" element={<Profile/>}/>
                        <Route path="orders" element={<OrderHistory/>}/>
                        <Route path="items">
                            <Route path="getitems" element={<ShowFeed/>}/>
                        </Route>
                        <Route path="auth">
                            <Route path="login" element={<Login/>}/>
                            <Route path="signup" element={<Register/>}/>
                        </Route>
                        <Route path="admin">
                            <Route path="items" element={<EditItems/>}/>
                            <Route path="users" element={<Users/>}/>
                        </Route>
                        <Route path="cart">
                            <Route path="getcart" element={<Cart/>}/>
                        </Route>
                        <Route path="*" element={<Navigate to="/items/getitems"/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}

export default App;