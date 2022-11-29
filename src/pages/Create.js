import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import supabase from '../config/supabaseClient';

const Create = () => {
  const navigate = useNavigate();
  const [title, setTitile] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState('');

  const createPost = async ({ title, text, rating }) => {
    await supabase.from('products').insert([{ title, text, rating }]);
  };

  const { mutateAsync } = useMutation(
    'createPost',
    () => createPost({ title, text, rating }),
    {
      onSuccess: () => {
        navigate('/');
      },
    }
  );

  const handleSummit = async (e) => {
    e.preventDefault();
    if ((title, text, rating)) {
      mutateAsync(title, text, rating);
    }
  };
  return (
    <div>
      <form>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          id='title'
          value={title}
          onChange={(e) => setTitile(e.target.value)}
        />
        <label htmlFor='text'>Text</label>
        <input
          type='text'
          id='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <label htmlFor='rating'>Rating</label>
        <input
          type='text'
          id='rating'
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <button onClick={handleSummit}>create</button>
      </form>
    </div>
  );
};

export default Create;
