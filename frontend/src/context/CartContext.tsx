import { CartItem } from '../types/CartItem';

interface CartContextType {
  cart: CartItem[];
  addtoCart: (item: CartItem) => void;
  removeFromCart: (bookId: number) => void;
  clearCart: () => void;
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
        const existingItem = prevCart.find((c) => c.bookId === item.bookId);
        const updatedCart = prevCart.map((c) =>
            c.bookId === item.bookId
                ? { ...c, bookPrice: c.bookPrice + item.bookPrice }
                : c
            );

            return existingItem ? updatedCart : [...prevCart, item];

    });        
  };

  const removeFromCart = (bookId: number) => {
    setCart((prevCart) => prevCart.filter((c) => c.bookId === bookId));
  };

  const clearCart = () => {
    setCart(() => []);
  };

  return (
    <>
        <CartContext.CartProvider
            value{{ cart, addToCart, removeFromCart, clearCart }}>
                {children}
            </CartContext.CartProvider>
    </>
  )
};
