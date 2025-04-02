import CookieConsent from 'react-cookie-consent';
import BookList from '../components/BookList';
import CategoryFilter from '../components/CategoryFilter';
import WelcomeBand from '../components/WelcomeBand';
import Fingerprint from '../components/Fingerprint';
import { useState } from 'react';
import CartSummary from '../components/CartSummary';
import 'bootstrap/dist/css/bootstrap.min.css';

function BookPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <>
      <div className="container mt-5">
        {/* Cart Summary: Sticky at the top of the page */}
        <div className="sticky-top mb-4">
          <CartSummary />
        </div>

        <WelcomeBand />

        {/* Main Content Row */}
        <div className="row mt-4">
          {/* Category Filter Column */}
          <div className="col-md-3">
            <div className="card p-3 mb-4">
              <h4 className="mb-3">Filter by Category</h4>
              <CategoryFilter
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
              />
            </div>
          </div>

          {/* Book List Column */}
          <div className="col-md-9">
            <div className="card p-3 mb-4">
              <h4 className="mb-3">Available Books</h4>
              <BookList selectedCategories={selectedCategories} />
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Consent Banner */}
      <CookieConsent
        buttonText="Got it!"
        style={{ background: '#2B373B', color: '#fff' }}
        buttonStyle={{
          backgroundColor: '#4CAF50',
          color: '#fff',
          fontSize: '13px',
          borderRadius: '5px',
          padding: '8px 20px',
        }}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>

      {/* Fingerprint Component */}
      <Fingerprint />
    </>
  );
}

export default BookPage;
