import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', {
        username: username,
        password: password,
        remember: remember
      });
      if (response.data.success) {
        window.location.href = '/dashboard';
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <label>
          Remember me:
          <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
        </label>
        <br />
        <button type="submit">Login</button>
        </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;