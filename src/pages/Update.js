import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../config/supabaseClient';
import { useQuery, useMutation } from 'react-query';

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitile] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState('');

  const getPostById = async (userID) => {
    const { data } = await supabase
      .from('products')
      .select()
      .eq('id', userID)
      .single();
    return data;
  };

  const updatePostById = async ({ title, text, rating }) => {
    await supabase
      .from('products')
      .update({ title, text, rating })
      .eq('id', id);
  };

  const { data, isLoading } = useQuery(['getPostById', id], () =>
    getPostById(id)
  );

  useEffect(() => {
    if (data) {
      setTitile(data.title);
      setText(data.text);
      setRating(data.rating);
    }
  }, [data]);

  const { mutateAsync } = useMutation(
    'createupdatePostByIdPost',
    (userData) => updatePostById(userData),
    {
      onSuccess: () => {
        navigate('/');
      },
    }
  );
  const handleSubmmit = (e) => {
    e.preventDefault();
    console.log(title);
    mutateAsync({ title, text, rating });
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      <div>Update - {id}</div>
      {data && (
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
          <button onClick={handleSubmmit}>create</button>
        </form>
      )}
    </div>
  );
};

export default Update;
