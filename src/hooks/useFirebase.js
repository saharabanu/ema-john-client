import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import initializeAuthentication from "../Firebase/firebase.init";


initializeAuthentication();
const useFirebase=()=>{
    const [user,setUser] = useState({});
    const [isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState('');
    // const [admin, setAdmin] = useState(false);

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
    // save user to database 
    // saveUser(email,name,'POST');
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
    // saveUser(user.email, user.displayName, 'PUT')
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
              setUser(user)
              
            } else {
             setUser({})
            }
            setIsLoading(false);
          });
          return ()=> unsubscribed;
    },[]);

    // useEffect(()=>{
    //   fetch(`https://glacial-fortress-22682.herokuapp.com/users/${user.email}`)
    //   .then(res=>res.json())
    //   .then(data=> setAdmin(data.admin))
    // },[user.email])



    const logOut =()=>{
      setIsLoading(true);
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          })
          .finally(()=>setIsLoading(false));
    }
    // const saveUser =(email,displayName, method)=>{
    //   const user ={email,displayName};
    //   fetch('https://glacial-fortress-22682.herokuapp.com/users',{
    //     method: method,
    //     headers:{'content-type':'application/json'},
    //     body:JSON.stringify(user)
    //   })
    //   .then()

    // }

    return {
        user,
        // admin,
        error,
        isLoading,
        registerUser,
        loginUser,
        signinWithGoogle,
        logOut
    }
    




}
export default useFirebase;