import Card from '../ui/card';
import classes from './cart.module.css';
import CartItem from './cart-Item';
import { useSelector } from 'react-redux';

const Cart = () => {
  const { items: cartItems } = useSelector((state) => state.cart);
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems &&
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))}
      </ul>
    </Card>
  );
};

export default Cart;
