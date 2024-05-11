import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import Blog from "../pages/Blog/Blog";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Shop from "../pages/Shop/Shop";
import DashboardLayout from "../layouts/DashboardLayout";
import Welcome from "../pages/Dashboard/Welcome";
import Details from "../pages/Details/Details";
import ProfileUpdate from "../pages/ProfileUpdate/ProfileUpdate";
import AddProduct from "../pages/Dashboard/AddProduct";
import MyProducts from "../pages/Dashboard/MyProducts";
import ApplyVerify from "../pages/Dashboard/ApplyVerify";
import AllUsers from "../pages/Dashboard/AllUsers";
import MyBookings from "../pages/Dashboard/MyBookings";
import AllBookings from "../pages/Dashboard/AllBookings";
import BecomeASeller from "../pages/Dashboard/BecomeASeller";
import ErrorPage from "../pages/Shared/ErrorPage/ErrorPage";
import WishList from "../pages/WishList/WishList";
import ReportedProducts from "../pages/Dashboard/ReportedProducts";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/shop/:category',
                element: <Shop></Shop>
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/product-details/:id',
                element: <Details></Details>,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_APP_API_URL}/product/${params.id}`)
            },
            {
                path: '/profile-update',
                element: <ProfileUpdate></ProfileUpdate>
            },
            {
                path: '/wishList',
                element: <WishList></WishList>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                path: '',
                element: <Welcome></Welcome>
            },
            {
                path: 'add-product',
                element: <AddProduct></AddProduct>
            },
            {
                path: 'my-products',
                element: <MyProducts></MyProducts>
            },
            {
                path: 'apply-verify',
                element: <ApplyVerify></ApplyVerify>
            },
            {
                path: 'all-users',
                element: <AllUsers></AllUsers>
            },
            {
                path: 'all-bookings',
                element: <AllBookings></AllBookings>
            },
            {
                path: 'my-bookings',
                element: <MyBookings></MyBookings>
            },
            {
                path: 'become-seller',
                element: <BecomeASeller></BecomeASeller>
            },
            {
                path: 'reported-products',
                element: <ReportedProducts></ReportedProducts>
            }
        ]
    }
]);