import { useDispatch, useSelector } from 'react-redux';
import classes from './cart-button.module.css';
import { uiActions } from '../../store/ui-slice';

const CartButton = () => {
  const dispatch = useDispatch();
  const { totalQuantity } = useSelector((state) => state.cart);
  return (
    <button
      onClick={() => dispatch(uiActions.toggleCart())}
      className={classes.button}
    >
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
