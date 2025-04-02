import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      <div className="container my-5">
        <h2 className="text-center mb-4">Add {bookTitle} to Cart</h2>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4">
              <div className="mb-3">
                <label htmlFor="quantity" className="form-label">
                  Quantity
                </label>
                <input
                  id="quantity"
                  type="number"
                  className="form-control"
                  placeholder="Enter quantity"
                  value={bookQuantity}
                  onChange={(e) => setBookQuantity(Number(e.target.value))}
                  min="1"
                />
              </div>

              <div className="d-flex justify-content-between">
                <button className="btn btn-success" onClick={handleAddToCart}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="btn btn-secondary" onClick={() => navigate(-1)}>
        Continue Shopping
      </button>
    </>
  );
}

export default BookInfoPage;
