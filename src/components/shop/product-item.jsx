import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import Card from '../ui/card';
import classes from './product-item.module.css';

const ProductItem = ({ product }) => {
  const { title, price, description } = product;
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(cartActions.addItemToCart(product));
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
