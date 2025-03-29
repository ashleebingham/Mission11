import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import { useState } from 'react';

function BookInfoPage() {
  const navigate = useNavigate();
  const { bookTitle, bookId, bookPrice } = useParams();
  const { addToCart } = useCart();
  const [bookQuantity, setBookQuantity] = useState<number>(0);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookId: Number(bookId),
      bookTitle: bookTitle || 'No Book Found',
      bookPrice: Number(bookPrice),
      bookQuantity,
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <WelcomeBand />
      <h2>Add {bookTitle} to Cart</h2>

      <div>
        <input
          type="number"
          placeholder="Enter quantity"
          value={bookQuantity}
          onChange={(x) => setBookQuantity(Number(x.target.value))}
        />
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>

      <button onClick={() => navigate(-1)}>Continue Shopping</button>
    </>
  );
}
export default BookInfoPage;
