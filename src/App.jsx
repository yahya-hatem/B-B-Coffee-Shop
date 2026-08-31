import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import Header from "./components/Header";
import Hero from "./components/Hero";
import CoffeeCard from "./components/CoffeeCard";
import FeedbackForm from "./components/FeedbackForm";
import ReviewCard from "./components/ReviewCard";
import Founder from "./components/Founder";
import Footer from "./components/Footer";

import { coffees } from "./data/coffees";
import useLocalStorage from "./components/hooks/useLocalStorage";
import { db } from "./firebase";

function App() {
  const [cart, setCart] = useLocalStorage("bb-cart", []);

  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState("");

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

  const addToCart = (coffee) => {
    setCart([...cart, coffee]);

    alert(
      `${coffee.name} has been added to your cart! ☕`
    );
  };

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
    <div className="app">
      <Header
        cartCount={cart.length}
        onCartClick={showCart}
      />

      <Hero />

      <main>
        <section
          className="container menu-section"
          id="menu"
        >
          <div className="menu-header">
            <div>
              <span className="section-tag">
                OUR MENU
              </span>

              <h2>Choose Your Favorite</h2>

              <p>
                Discover our selection of freshly
                prepared coffee and drinks.
              </p>
            </div>

            <div className="menu-count">
              {coffees.length} Drinks
            </div>
          </div>

          <section className="coffee-grid">
            {coffees.map((coffee) => (
              <CoffeeCard
                key={coffee.id}
                coffee={coffee}
                onAddToCart={addToCart}
              />
            ))}
          </section>

          {coffees.length > 0 && (
            <div className="menu-message">
              ☕ Fresh coffee is waiting for you!
            </div>
          )}
        </section>

        <Founder />

        <FeedbackForm onAddReview={addReview} />

        <section
          className="reviews-list-section"
          id="reviews"
        >
          <div className="section-heading">
            <span className="section-tag">
              WHAT OUR CUSTOMERS SAY
            </span>

            <h2>Customer Reviews</h2>
          </div>

          {reviewsError ? (
            <p className="review-count">
              {reviewsError}
            </p>
          ) : reviewsLoading ? (
            <p className="review-count">
              Loading customer reviews... ☕
            </p>
          ) : reviews.length > 0 ? (
            <div className="reviews-grid">
              {reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                />
              ))}
            </div>
          ) : (
            <p className="review-count">
              No reviews yet. Be the first to leave a review! ⭐
            </p>
          )}

          {reviews.length > 0 && (
            <p className="review-count">
              ❤️ {reviews.length} customer reviews
            </p>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
