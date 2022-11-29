import { Link } from 'react-router-dom';
import supabase from '../config/supabaseClient';
import { useQuery, useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import './card.css';
const ProductCard = ({ id, title, text, rating }) => {
  const navigate = useNavigate();

  const deleteProduct = async (id) => {
    await supabase.from('products').delete().eq('id', id);
  };

  const handleDelete = async () => {
    mutateAsync(id);
  };
  const { mutateAsync } = useMutation(
    'deleteProduct',
    () => deleteProduct(id),
    {
      onSuccess: () => {
        window.location.reload();
      },
    }
  );
  return (
    <div className='cardWrapper' key={id}>
      <p>{title}</p>
      <p>{text}</p>
      <p>{rating}</p>
      <button onClick={handleDelete}>delete</button>
      <Link to={'/' + id}>update</Link>
    </div>
  );
};

export default ProductCard;
