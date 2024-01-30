import React, { useEffect } from 'react';
import './Login.css';
import { useState } from 'react';
import { jwtDecode as jwt_decode } from 'jwt-decode';

function Login() {
  const [user, setUser] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  function handleCallbackResponse(response) {
    console.log('Encoded JWT id :' + response.credential);
    var userObject = jwt_decode(response.credential);
    setUser(userObject);
    document.getElementById('signInDiv').hidden = true;
    document.getElementById('a').hidden = true;
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: '1094306029002-i1oc0tjuklfag9hi4v6j0gdcg1hvqb4r.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById('signInDiv'), { theme: 'outline', size: 'larger' });
  }, []);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleLogin = () => {
    if (!validateEmail(email)) {
      alert('Invalid email format');
      return;
    }

    if (!validatePassword(password)) {
      alert('Invalid password format');
      return;
    }

  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be more than 6 characters long
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  return (
    <div className='settingCenter'>
      <div className='container'>
        <div id='a'>
          <h2>Welcome to Materio</h2>
          <p>Please sign in your account and start your adventure</p>
          <form>
            <input type='email' className='form-control my-3' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
            <input
              type='password'
              className='form-control my-3'
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </form>
          <div className='d-flex justify-content-between'>
            <div>
              <input
                type='checkbox'
                className='ms-2'
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <label className='text-grey ps-3' htmlFor=''>
                Remember me
              </label>
            </div>
            <div>
              <a style={{ textDecoration: 'none' }} href=''>
                Forget Password?
              </a>
            </div>
          </div>
          <br />
          <button className='w-100 btn btn-primary' onClick={handleLogin}>
            LOGIN
          </button>
          <br />
          <br />
          <div className='text-center'>
            New on platform? <a href='' style={{ textDecoration: 'none' }}>
              Create an account
            </a>
          </div>
          <hr />
        </div>
        <div className='d-flex justify-content-center'>
          <div id='signInDiv'></div>
          {user && (
            <div className='text-center'>
              <img src={user.picture} alt='' />
              <br />
              <br />
              <h3> {user.name}</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
