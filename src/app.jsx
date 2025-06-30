import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/cart/cart';
import Layout from './components/layout/layout';
import Products from './components/shop/products';
import { useEffect } from 'react';
import { uiActions } from './store/ui-slice';
import Notification from './components/ui/notification';

let initialRenderNumber = 1;

function App() {
  const { cartIsVisible, notification } = useSelector((state) => state.ui);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotifications({
          status: 'pending',
          title: 'Sending...',
          message: 'Sending cart data',
        })
      );

      const res = await fetch(`${import.meta.env.VITE_API_URL}/cart.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/jsonm',
        },
        body: JSON.stringify(cart),
      });
      if (!res.ok) {
        throw new Error('There was an error sending cart data');
      }

      dispatch(
        uiActions.showNotifications({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully',
        })
      );
    };

    if (initialRenderNumber <= 2) {
      initialRenderNumber++;
      return;
    }

    sendCartData().catch((err) => {
      console.log(err);
      dispatch(
        uiActions.showNotifications({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      );
    });
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
