import './App.css';
import BookPage from './pages/BookPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookInfoPage from './pages/BookInfoPage';
import UserCartPage from './pages/UserCartPage';
import { CartProvider } from './context/CartContext';
import AdminBooksPage from './pages/AdminBooksPage';

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BookPage />} />
            <Route path="/books" element={<BookPage />} />
            <Route
              path="/info/:bookTitle/:bookId/:bookPrice"
              element={<BookInfoPage />}
            />
            <Route path="/cart" element={<UserCartPage />} />
            <Route path="/adminbooks" element={<AdminBooksPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
