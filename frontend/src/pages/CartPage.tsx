import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';

function CartPage() {
  const navigate = useNavigate();
  const { bookTitle } = useParams();
  const { addToCart } = useCart();
  const [bookQuantity];

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookId,
      bookTitle,
      bookPrice,
    };
    addToCart(newItem);
    navigate('/userCart');
  };

  return (
    <>
      <WelcomeBand />
      <h2>Add {bookTitle} to Cart</h2>

      <div>
        <input type="number" placeholder="Enter quantity" />
        <button onClick={() => navigate('/books')}>Add to Cart</button>
      </div>

      <button onClick={() => navigate(-1)}>Continue Shopping</button>
    </>
  );
}
export default CartPage;
