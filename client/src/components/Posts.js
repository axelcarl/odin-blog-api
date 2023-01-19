import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Post from './Post';
import icon from '../icon.svg'

function Posts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:5000');
      console.log(response.data.posts);
      setData(response.data.posts);
    }
    fetchData();
  }, []);


  return (
    <div>
      <div className="header">
      </div>
      <a href="/">
        <img src={icon} alt="logotype icon" className='icon' />
      </a>
      
      {data.sort((a, b) => a.postedAt > b.postedAt ? -1 : 1).map(post => {
        return <Post
          key={crypto.randomUUID()}
          post={post}
        />
      })}
    </div>
  );
}

export default Posts;