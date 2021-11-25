import { createUserWithEmailAndPassword, getAuth, getIdToken, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import initializeAuthentication from "../Firebase/firebase.init";


initializeAuthentication();
const useFirebase=()=>{
    const [user,setUser] = useState({});
    const [isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState('');
    

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

// register user 
    const registerUser=(email,password,name,history)=>{
      setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
  .then((result) => {
    setError('');
    const newUser = {email,displayName:name};
    setUser(newUser);
    
    // send name to firebase after creation 
    updateProfile(auth.currentUser, {
      displayName: name, 
    }).then(() => {
      
    }).catch((error) => {
     
    });
    history.replace('/');
  })
  .catch((error) => {
    setError(error.message);
    
  }) 
  .finally(()=>setIsLoading(false));

    }
// login user 
    const loginUser =(email,password,location,history)=>{
      setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
  .then((result) => {
    const destination = location?.state?.from || '/';
    history.replace(destination)
    setError('');
  })
  .catch((error) => {
    setError(error.message);
  })
  .finally(()=>setIsLoading(false));
    }

    // google sign in 
    const signinWithGoogle =(location,history)=>{
      setIsLoading(true);
      
       signInWithPopup(auth, googleProvider)
      .then((result) => {
    
    // const user = result.user;
   
    const destination = location?.state?.from || '/';
    history.replace(destination)
    setError('');

    
  }).catch((error) => {
    setError(error.message)
  })
  .finally(()=>setIsLoading(false));
    }

    // observer user state 
    useEffect(()=>{
     const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                getIdToken(user)
                .then(idToken=>localStorage.setItem('idToken',idToken));
              setUser(user)

              
            } else {
             setUser({})
            }
            setIsLoading(false);
          });
          return ()=> unsubscribed;
    },[]);

    



    const logOut =()=>{
      setIsLoading(true);
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          })
          .finally(()=>setIsLoading(false));
    }
    

    return {
        user,
        error,
        isLoading,
        registerUser,
        loginUser,
        signinWithGoogle,
        logOut
    }
    




}
export default useFirebase;