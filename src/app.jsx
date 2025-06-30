import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/cart/cart';
import Layout from './components/layout/layout';
import Products from './components/shop/products';
import { useEffect } from 'react';
import Notification from './components/ui/notification';
import { fetchCartData, sendCartData } from './store/cart-slice';

let initialRenderNumber = 1;

function App() {
  const { cartIsVisible, notification } = useSelector((state) => state.ui);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (initialRenderNumber <= 2) {
      initialRenderNumber++;
      return;
    }

    dispatch(sendCartData(cart));
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {cartIsVisible && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
