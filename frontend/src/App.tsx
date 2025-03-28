import './App.css';
import BookPage from './pages/BookPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CartPage from './pages/CartPage';
import UserCartPage from './pages/UserCartPage';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BookPage />} />
            <Route path="/books" element={<BookPage />} />
            <Route path="/cart/:bookTitle" element={<CartPage />} />
            <Route path="/userCart" element={<UserCartPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
