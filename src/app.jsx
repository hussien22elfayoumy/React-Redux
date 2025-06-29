import { useSelector } from 'react-redux';
import Cart from './components/cart/cart';
import Layout from './components/layout/layout';
import Products from './components/shop/products';

function App() {
  const { cartIsVisible } = useSelector((state) => state.ui);

  return (
    <Layout>
      {cartIsVisible && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
