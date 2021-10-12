import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div className="login-form">
            <div>
                <h2>Create Account</h2>
               <form onSubmit="">
                   <input type="text" name="" id=""  placeholder="your name"/>
                   <br /> <br />
               <input type="email" placeholder="your email" />
               <br /> <br />
               <input type="password" placeholder="your password" />
               <br /> <br />
               <input type="password" placeholder="Re-enter your password" />
               <br /> <br />
               <input type="submit" value="Submit" />

               </form>
               <p>Already have an account?  <Link to="/login">Login</Link></p>

               <div>---------or-----------</div>
                <button className=" btn-regular">Google Sign In</button>
            </div>
        </div>
    );
};

export default Register;