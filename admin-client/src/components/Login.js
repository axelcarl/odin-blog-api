import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/users/login', 
        {username, password});
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <p>login</p>
      <input type="text" placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={submit}>Submit</button>
    </div>
  );
}

export default Login; 