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
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import SellerRoute from "./SellerRoute";

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
                element: <PrivateRoute><ProfileUpdate></ProfileUpdate></PrivateRoute>
            },
            {
                path: '/wishList',
                element: <PrivateRoute> <WishList></WishList></PrivateRoute>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                path: '',
                element: <PrivateRoute> <Welcome></Welcome></PrivateRoute>
            },
            {
                path: 'add-product',
                element: <SellerRoute> <AddProduct></AddProduct></SellerRoute>
            },
            {
                path: 'my-products',
                element: <SellerRoute> <MyProducts></MyProducts></SellerRoute>
            },
            {
                path: 'apply-verify',
                element: <SellerRoute> <ApplyVerify></ApplyVerify></SellerRoute>
            },
            {
                path: 'all-users',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: 'all-bookings',
                element: <AdminRoute> <AllBookings></AllBookings></AdminRoute>
            },
            {
                path: 'my-bookings',
                element: <PrivateRoute> <MyBookings></MyBookings></PrivateRoute>
            },
            {
                path: 'become-seller',
                element: <PrivateRoute><BecomeASeller></BecomeASeller></PrivateRoute>
            },
            {
                path: 'reported-products',
                element: <AdminRoute> <ReportedProducts></ReportedProducts></AdminRoute>
            }
        ]
    }
]);