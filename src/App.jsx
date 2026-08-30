import { useState } from "react";

import Header from "./components/Header";
import Hero from "./components/Hero";
import CoffeeCard from "./components/CoffeeCard";
import FeedbackForm from "./components/FeedbackForm";
import ReviewCard from "./components/ReviewCard";
import Founder from "./components/Founder";
import Footer from "./components/Footer";

import { coffees } from "./data/coffees";

function App() {
  const [cart, setCart] = useState([]);

  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Ahmed",
      phone: "01000000000",
      rating: 5,
      feedback:
        "Amazing coffee and a beautiful atmosphere!",
    },
    {
      id: 2,
      name: "Mariam",
      phone: "01111111111",
      rating: 4,
      feedback:
        "The Cappuccino was delicious. I really enjoyed it.",
    },
  ]);

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
      .map((item) => `• ${item.name} - ${item.price} EGP`)
      .join("\n");

    const total = cart.reduce(
      (sum, item) => sum + item.price,
      0
    );

    alert(
      `Your Cart 🛒\n\n${items}\n\nTotal: ${total} EGP`
    );
  };

  const addReview = (newReview) => {
    setReviews([newReview, ...reviews]);
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

              <h2>
                Choose Your Favorite
              </h2>

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

        <section className="reviews-list-section">
          <div className="section-heading">
            <span className="section-tag">
              WHAT OUR CUSTOMERS SAY
            </span>

            <h2>
              Customer Reviews
            </h2>
          </div>

          <div className="reviews-grid">
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
              />
            ))}
          </div>

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