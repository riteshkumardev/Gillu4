import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

const Login = () => {

  const [err, setErr] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    
    e.preventDefault()

    const email = e.target[0].value;
    const password = e.target[1].value;

    try{
      
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")

    }catch(err){
      setErr(true)
    }
    
  }

  console.log(err)

  return (
    <div>
      <section className='formContainer'>
        <section className='formWrapper'>
            <span className='logo-register'>Chat App</span>
            <span className='title-register'>Login</span>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder='E-mail'/>
                <input type="password" placeholder='Password'/>
                <button>Log in</button>
                {err && <span>Wrong username or password!</span>}
            </form>
            <p>You don't have an account? <Link to="/register">Register</Link></p>
        </section>
      </section>
    </div>
  )
}

export default Login
