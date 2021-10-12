import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './Login.css';

const Login = () => {
    const {signInUsingGoogle}=useAuth();
    const location = useLocation();
    const history = useHistory()
    const redirect_uri =location.state?.from || '/shop'
    const handleGoogleLogin=()=>{
        signInUsingGoogle()
        .then(result=>{
            history.push(redirect_uri)
            
        })
    }
    return (
        <div className="login-form">
            <div >
                <h2>Log-In</h2>
                <form >
                    <input type="text" placeholder="your email"/>
                    <br /> <br />
                    <input type="password" placeholder="your password" />
                    <br /> <br />
                    <input type="submit" value="Submit"/>
                </form>
                <p>New to Ema-John <Link to="/register">Create Account</Link></p>

                <div>---------or-----------</div>
                <button onClick={handleGoogleLogin} className=" btn-regular">Google Sign In</button>


            </div>
        </div>
    );
};

export default Login;