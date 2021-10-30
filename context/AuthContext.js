import { 
    createContext, 
    useContext, 
    useEffect, 
    useState 
} from "react";

import { 
    createUserWithEmailAndPassword,
    onAuthStateChanged, 
    sendPasswordResetEmail, 
    signInWithEmailAndPassword,
    signOut 
} from "@firebase/auth";


import { auth } from "../lib/firebase";

const AuthContext = createContext({
    currentUser: null,
    signUp: () => Promise,
    signIn: () => Promise,
    logout: () => Promise
})

export const useAuth = () => useContext(AuthContext);


//Authentication functions
function signUp (email, password){
    return createUserWithEmailAndPassword(auth, email, password);
}

function signIn (email, password){
    return signInWithEmailAndPassword(auth, email, password);
}

function resetPassword (email){
    return sendPasswordResetEmail(auth, email)
}

function logout (){
    return signOut(auth);
}



function AuthProvider ({children}){

    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    const contextValue = {
        currentUser,
        signUp,
        signIn,
        logout,
        resetPassword,
        loading
    }

    useEffect(()=>{
        const unsubscibe = onAuthStateChanged(auth, user =>{
            setCurrentUser(user);
            setLoading(false);
        })
        return () => {
            unsubscibe()
        }
    }, [])

    return(
        <AuthContext.Provider value ={contextValue}>
            {children}
        </AuthContext.Provider>
    )

}


export default AuthProvider;