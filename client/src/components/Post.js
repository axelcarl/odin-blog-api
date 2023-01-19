import axios from 'axios';
import React, { useState } from 'react';

function Post({ post }) {
  const { title, _id, message, postedAt, comments } = post;
  const [comment, setComment] = useState('');

  const submit = async () => {
    try {
      await axios.post(`http://localhost:5000/posts/${_id}/comment`, {comment});
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='post-container'>
      <div className="post-content">
        <div className="post title">
          <h1>{title}</h1>
        </div>
        <div className="post-message">
          {message}
          <div className="post-message-date">
            <b>Posted at: {new Date(postedAt).toDateString()}</b>
          </div>
        </div>
      </div>
      <div className="post-comment-section">
        <h2>Comments:</h2>
        <div className="post-comments">
          {comments.map(com => <div key={crypto.randomUUID()}>{com}</div>)}
        </div>
        <h3>Add to the conversation:</h3>
        <input type="text" name='comment' 
          value={comment} onChange={e => setComment(e.target.value)}/>
        <button onClick={submit}>Comment</button>
        
      </div>  
    </div>
  );
}

export default Post;