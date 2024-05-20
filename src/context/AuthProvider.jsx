import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../auth/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify, toastWarnNotify } from "../helpers/ToastNotify";

const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
  userObserver()
  }, [])
  

  const createUser = async (email, password, displayName) => {
    try {
     await createUserWithEmailAndPassword(auth, email, password);
     await updateProfile(auth.currentUser, {
       displayName: displayName
     })
     navigate("/login");
     toastSuccessNotify('registered successfully')
    } catch (error) {
      toastErrorNotify(error.message)
    }
  };
  const loginUser = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      toastSuccessNotify("logged in successfully");
    } catch (error) {
      toastErrorNotify(error.message);
    }
  };

  const logOut = () => {
    signOut(auth).then(()=> {
        toastSuccessNotify("loggout in successfully");
        navigate('/login')
    }).catch((error)=>{
        toastErrorNotify(error.message);
    })
  }

  const userObserver = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const {email, displayName, photoURL} = user
       setCurrentUser({ email, displayName, photoURL });
      } else {
        setCurrentUser(false)
      }
    });
  }

  const googleProvider = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate('/')
        toastSuccessNotify('logged in successfully')
      })
      .catch((error) => {
       toastErrorNotify(error.message)
      });
  }

  const forgotPassword = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toastWarnNotify('check your mail box')
      })
      .catch((error) => {
        toastErrorNotify(error.message)
      });
  };

  console.log(currentUser)

  const values = {
    currentUser,
    createUser,
    loginUser,
    logOut,
    googleProvider,
    forgotPassword,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
