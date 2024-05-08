import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";
//import axios from "axios";
//import { setAuthToken } from "../api/auth";

const auth = getAuth(app)

export const AuthContext = createContext()
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Create User
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //  Update Name
    const updateUserProfile = (name, photo) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
    }
    //  Google Signin
    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    //  Logout
    const logout = () => {
        setLoading(true)
        localStorage.removeItem('reShop-token')
        return signOut(auth)
    }

    // Login with Password
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }



    useEffect(() => {
        //this part will execute once the component is mounted.
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            //const userEmail = currentUser?.email || user?.email;
            // const loggedUser = {
            //     email: userEmail
            // }

            setUser(currentUser);

            // if (currentUser) {

            //     axios.post(`${import.meta.env.VITE_APP_API_URL}/jwt`, loggedUser, { withCredentials: true })
            //         .then(res => {
            //             setLoading(false);
            //             console.log('token client', res.data);
            //         })
            // }
            // else {
            //     axios.post(`${import.meta.env.VITE_APP_API_URL}/logout`, loggedUser, {
            //         withCredentials: true
            //     })
            //         .then(res => {
            //             setLoading(false);
            //             console.log(res.data);
            //         })
            // }
            setLoading(false);
        })




        return () => {
            //this part will execute once the component is unmounted.
            unsubscribe()
        }
    }, [user?.email])



    const authInfo = {
        user,
        loading,
        setLoading,
        createUser,
        updateUserProfile,
        signIn,
        signInWithGoogle,
        logout
    }
    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;