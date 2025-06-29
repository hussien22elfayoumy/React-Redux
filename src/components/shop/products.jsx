import ProductItem from './product-item';
import classes from './products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: '1',
    title: 'Phone',
    price: 599,
    description: 'A sleek smartphone with cutting-edge features.',
  },
  {
    id: '2',
    title: 'Laptop',
    price: 1299,
    description: 'High-performance laptop perfect for work and play.',
  },
  {
    id: '3',
    title: 'Headphones',
    price: 199,
    description: 'Noise-cancelling headphones with crystal clear sound.',
  },
  {
    id: '4',
    title: 'Smartwatch',
    price: 299,
    description: 'Track your health and stay connected on the go.',
  },
  {
    id: '5',
    title: 'Camera',
    price: 799,
    description: 'Capture every moment with stunning clarity.',
  },
];

const Products = () => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ul>
    </section>
  );
};

export default Products;
