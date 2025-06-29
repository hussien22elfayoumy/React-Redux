import { useDispatch } from 'react-redux';
import classes from './cart-item.module.css';
import { cartActions } from '../../store/cart-slice';

const CartItem = ({ cartItem }) => {
  const { title, quantity, totalPrice, price } = cartItem;
  const dispatch = useDispatch();

  const addItemHanlder = () => {
    dispatch(cartActions.addItemToCart(cartItem));
  };

  const removeItemHandler = () => {
    dispatch(cartActions.removeItemFromCart(cartItem.id));
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${totalPrice.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeItemHandler}>-</button>
          <button onClick={addItemHanlder}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
