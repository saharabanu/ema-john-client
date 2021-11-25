import React from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { Link, useHistory, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './Login.css';

const Login = () => {
    const {user,loginUser,signinWithGoogle,isLoading,error} = useAuth();
    const { register, handleSubmit, } = useForm();
    
      const location = useLocation();
      const history = useHistory();

    const onSubmit = (data) => {

      loginUser(data.email, data.password,location,history);
        // console.log(data);
    };
    const handleGoogleSignIn =()=>{
      signinWithGoogle(location,history);
    }
    return (
        <div className="text-center">
            <h2>Please Login</h2>
            { !isLoading && <form onSubmit={handleSubmit(onSubmit)}>
        
        <input
          className="input-field mb-3"
          name="email"
          placeholder="Email"
          type="email"
          {...register("email", { required: true })}
        />
        <br />
        <input
          className="input-field mb-3"
          name="password"
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        <br />
        <input
          className="submit-btn btn btn-danger mt-3"
          type="submit"
          value="Login"
        />
      </form>}
      {isLoading && <Spinner animation="border" variant="danger" />}
      {user?.email && <Alert
      variant="success">Create user successfully</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <p>Are You New User?<Link to='/register'>Please Register</Link></p>


      <div>---------------------------------------</div>
      <button onClick={handleGoogleSignIn} className="btn btn-warning">Google SignIn</button>

        </div>
    )

};

export default Login;







// <div className="login-form">
//             <div >
//                 <h2>Log-In</h2>
//                 <form >
//                     <input type="text" placeholder="your email"/>
//                     <br /> <br />
//                     <input type="password" placeholder="your password" />
//                     <br /> <br />
//                     <input type="submit" value="Submit"/>
//                 </form>
//                 <p>New to Ema-John <Link to="/register">Create Account</Link></p>

//                 <div>---------or-----------</div>
//                 <button onClick={handleGoogleLogin} className=" btn-regular">Google Sign In</button>


//             </div>
//         </div>