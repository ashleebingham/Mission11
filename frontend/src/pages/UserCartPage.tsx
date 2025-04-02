import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserCartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  let totalQuantity = 0;
  let totalPrice = 0.0;

  cart.map((item: CartItem) => (totalQuantity += item.bookQuantity));
  cart.map(
    (item: CartItem) => (totalPrice += item.bookPrice * item.bookQuantity)
  );

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Your Cart</h1>
      <div className="row">
        {cart.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          <div className="col-12">
            <ul className="list-group">
              {cart.map((item: CartItem) => (
                <li
                  key={item.bookId}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{item.bookTitle}</strong>
                    <p className="mb-1">
                      Quantity: {item.bookQuantity.toFixed(0)}
                    </p>
                    <p className="mb-1">Price: ${item.bookPrice.toFixed(2)}</p>
                    <p className="mb-1">
                      Subtotal: $
                      {(item.bookPrice * item.bookQuantity).toFixed(2)}
                    </p>
                  </div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeFromCart(item.bookId)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="mt-4 text-center">
          <h4>Total Items in Cart: {totalQuantity.toFixed(0)}</h4>
          <h4>Total: ${totalPrice.toFixed(2)}</h4>

          <div className="d-flex justify-content-center mt-4">
            <button className="btn btn-success mx-2">Checkout</button>
            <button
              className="btn btn-secondary mx-2"
              onClick={() => navigate('/books')}
            >
              Continue Browsing
            </button>
          </div>
        </div>
      )}

      {/* Always show the Continue Browsing button if cart is empty */}
      {cart.length === 0 && (
        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-secondary"
            onClick={() => navigate('/books')}
          >
            Continue Browsing
          </button>
        </div>
      )}
    </div>
  );
}

export default UserCartPage;
