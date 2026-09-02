import { useEffect, useState } from "react";
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

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import useLocalStorage from "./components/hooks/useLocalStorage";
import { db } from "./firebase";

function App() {
  const [cart, setCart] = useLocalStorage("bb-cart", []);

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
    setCart([...cart, coffee]);

    alert(`${coffee.name} has been added to your cart! ☕`);
  };

  // Show shopping cart
  const showCart = () => {
    if (cart.length === 0) {
      alert("Your cart is empty ☕");
      return;
    }

    const items = cart
      .map(
        (item) =>
          `• ${item.name} - ${item.price} EGP`
      )
      .join("\n");

    const total = cart.reduce(
      (sum, item) => sum + item.price,
      0
    );

    alert(
      `Your Cart 🛒\n\n${items}\n\nTotal: ${total} EGP`
    );
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
      <div className="app">

        <Header
          cartCount={cart.length}
          onCartClick={showCart}
        />

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