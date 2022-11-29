import supabase from '../config/supabaseClient';
import { useQuery, useMutation } from 'react-query';
import ProductCard from '../components/productCard';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const getProducts = async () => {
    const { data, err } = await supabase.from('products').select();
    if (err) {
      throw new Error(err.message);
    }

    if (!data) {
      throw new Error('Posts not found');
    }

    return data;
  };

  //   const deleteProduct = async (id) => {
  //     await supabase.from('products').delete().eq('id', id);
  //   };

  //   const { mutateAsync } = useMutation(
  //     'deleteProduct',
  //     (id) => deleteProduct(id),
  //     {
  //       onSuccess: () => {
  //         navigate('/');
  //       },
  //     }
  //   );

  const { data, isLoading } = useQuery('getProducts', () => getProducts());

  return (
    <div>
      <h1>home</h1>
      {isLoading && <div>Loading..</div>}
      {data &&
        data.map((el) => (
          <ProductCard
            key={el.id}
            title={el.title}
            id={el.id}
            text={el.text}
            rating={el.rating}
          />
        ))}
    </div>
  );
};

export default Home;
