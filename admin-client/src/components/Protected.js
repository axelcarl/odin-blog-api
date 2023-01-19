import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Protected() {
  const [data, setData] = useState('Not authorized');
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:5000/protected', {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }
      );
      console.log(response.data.message);
      setData(response.data.message);
    }
    fetchData();
  }, [data]);

  const submit = async () => {
    try {
      await axios.post('http://localhost:5000/posts', message, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {data}
      <input type="text" name='message' value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={submit}>Post</button>
    </div>
  );
}

export default Protected;