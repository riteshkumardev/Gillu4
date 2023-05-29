import React, { useState } from 'react';
import Add from '../img/add-image.png';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {

  const [err, setErr] = useState(false);

  const navigate = useNavigate();

  const [avatar, setAvatar] = useState(null);
  const [message, setMessage] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleAvatarChange = (e) => {
    if (e.target.files[0]) {
      setAvatar(e.target.files[0]);
      setMessage('Avatar chosen successfully!');
      setAvatarPreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setMessage('');
      setAvatarPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    if (!avatar) {
      setMessage('Please choose an avatar.');
      return;
    }

    try{
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {

            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/")

          } catch (err) {
            console.log(err);
            setErr(true);
          }
        });
      });

    }catch(err){
      setErr(true)
    }
    
  }

  return (
     <section className='formContainer'>
      <section className='formWrapper'>
        <span className='logo-register'>Chatty</span>
        <span className='title-register'>Register</span>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Username'/>
            <input type="email" placeholder='E-mail'/>
            <input type="password" placeholder='Password (at least 6 characters)'/>
            <input type="file" id='file-register' className='registerHiddenFile' onChange={handleAvatarChange}/>
            <label htmlFor="file-register">
                <img src={Add} alt="" />
                <span>Add an avatar</span>
            </label>
            {avatarPreview && <img src={avatarPreview} style={{ display: 'inline-block' }} alt="Avatar Preview" className='avatarRegister'/>}
            {message && <p style={{ display: 'inline', marginTop: '0', color: '#008000' }}>{message}</p>}
            <button>Sign up</button>
            {err && <span>Something went wrong...</span>}
        </form>
        
        <p>Do you have an account? <Link to="/login">Login</Link></p>
      </section>
    </section>
  )
}

export default Register
