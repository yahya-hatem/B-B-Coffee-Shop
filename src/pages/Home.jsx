import Hero from "../components/Hero";
import CoffeeCard from "../components/CoffeeCard";
import FeedbackForm from "../components/FeedbackForm";
import ReviewCard from "../components/ReviewCard";
import Founder from "../components/Founder";

import { coffees } from "../data/coffees";

function Home({
  addToCart,
  addReview,
  reviews,
  reviewsLoading,
  reviewsError,
}) {
  return (
    <>
      <Hero />

      <main>

        {/* Menu */}
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

        {/* Founder */}
        <Founder />

        {/* Feedback */}
        <FeedbackForm
          onAddReview={addReview}
        />

        {/* Reviews */}
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
              No reviews yet. Be the first to leave
              a review! ⭐
            </p>
          )}

          {reviews.length > 0 && (
            <p className="review-count">
              ❤️ {reviews.length} customer reviews
            </p>
          )}

        </section>

      </main>
    </>
  );
}

export default Home;