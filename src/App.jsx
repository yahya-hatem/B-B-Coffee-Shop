import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import Header from "./components/Header";
import Footer from "./components/Footer";
import CartPanel from "./components/CartPanel";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import { addItem } from "./redux/slices/cartSlice";
import { db } from "./firebase";
import { useTheme } from "./context/useTheme";

function App() {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState("");

  // Load reviews from Firebase
  useEffect(() => {
    const reviewsQuery = query(
      collection(db, "reviews"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      reviewsQuery,
      (snapshot) => {
        const firebaseReviews = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setReviews(firebaseReviews);
        setReviewsError("");
        setReviewsLoading(false);
      },
      (error) => {
        console.error("Error loading reviews:", error);

        setReviewsError(
          "Could not load reviews right now. Please try again later."
        );

        setReviewsLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  // Add coffee to cart
  const addToCart = (coffee) => {
    dispatch(addItem(coffee));

    alert(`${coffee.name} has been added to your cart! ☕`);
  };

  const showCart = () => {
    setIsCartOpen((isOpen) => !isOpen);
  };

  // Add review to Firebase
  const addReview = async (newReview) => {
    await addDoc(collection(db, "reviews"), {
      name: newReview.name.trim(),
      phone: newReview.phone.trim(),
      rating: Number(newReview.rating),
      feedback: newReview.feedback.trim(),
      createdAt: serverTimestamp(),
    });
  };

  return (
    <BrowserRouter>
      <div className={`app theme-${theme}`}>

        <Header
          cartCount={cart.length}
          onCartClick={showCart}
        />
        {isCartOpen && <CartPanel onClose={() => setIsCartOpen(false)} />}

        <Routes>
          <Route
            path="/"
            element={
              <Home
                addToCart={addToCart}
                addReview={addReview}
                reviews={reviews}
                reviewsLoading={reviewsLoading}
                reviewsError={reviewsError}
              />
            }
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>

        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;