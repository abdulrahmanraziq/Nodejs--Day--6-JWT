import CreateUrl from "../components/CreateUrl";
import ForgotPassword from "../components/ForgotPassword";
import Home from "../components/Home";
import Login from "../components/Login";
import ResetPassword from "../components/ResetPassword";
import SignUp from "../components/SignUp";
import {Navigate} from 'react-router-dom';
import TopBar from "../components/TopBar";
import ViewUrl from "../components/ViewUrl";

const AppRoutes = [
    {
        path:'/signUp',
        element: <SignUp/>
    },
    {
        path:'/login',
        element: <Login/>
    },
    {
        path:'/forgot-password',
        element:<ForgotPassword/>
    },
    {
        path:'/reset-password',
        element:<ResetPassword/>
    }, 
    {
        path:'/home',
        element:
        <>
            <TopBar/>
            <Home/>
        </>
    },
    {
        path:'/createUrl',
        element:
        <>
            <TopBar/>
            <CreateUrl/>
        </>
        
    },
    {
        path:'/viewUrl/:shortUrl',
        element:
        <>
            <TopBar/>
            <ViewUrl/>
        </>
        
    },
    {
        path:'*',
        element: <Navigate to="/login" />
    }
]


export default AppRoutes