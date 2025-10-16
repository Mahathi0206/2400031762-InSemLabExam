import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPost = { title, body };
    axios
      .post('https://jsonplaceholder.typicode.com/posts', newPost)
      .then((response) => {
        setResponseMessage('Post created successfully!');
        setTitle('');
        setBody('');
        console.log(response.data); // you can also log the response if needed
      })
      .catch((err) => {
        setResponseMessage('Error creating post');
        console.error(err);
      });
  };

  return (
    <div>
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <textarea
          placeholder="Post Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <br />
        <button type="submit">Create Post</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default App;
