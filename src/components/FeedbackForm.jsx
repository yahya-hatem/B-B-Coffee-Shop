import { useState } from "react";

function FeedbackForm({ onAddReview }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name || !phone || !rating || !feedback) {
      alert("Please complete all fields and choose a rating.");
      return;
    }

    const newReview = {
      id: Date.now(),
      name: name,
      phone: phone,
      rating: rating,
      feedback: feedback,
    };

    onAddReview(newReview);

    setName("");
    setPhone("");
    setRating(0);
    setFeedback("");
    setSubmitted(true);
  };

  return (
    <section className="feedback-section" id="reviews">
      <div className="feedback-heading">
        <span className="section-tag">
          CUSTOMER REVIEWS
        </span>

        <h2>Share Your Experience ⭐</h2>

        <p>
          Tell us what you think about your
          Brew & Bean experience.
        </p>
      </div>

      <form
        className="feedback-form"
        onSubmit={handleSubmit}
      >
        <div className="form-row">
          <div className="form-group">
            <label>Your Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>

            <input
              type="tel"
              placeholder="01xxxxxxxxx"
              value={phone}
              onChange={(event) =>
                setPhone(event.target.value)
              }
            />
          </div>
        </div>

        <div className="form-group">
          <label>Your Rating</label>

          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                className={
                  star <= rating
                    ? "star selected"
                    : "star"
                }
                onClick={() => setRating(star)}
              >
                ★
              </button>
            ))}
          </div>

          {rating > 0 && (
            <p className="rating-text">
              You selected {rating} out of 5 stars
            </p>
          )}
        </div>

        <div className="form-group">
          <label>Your Feedback</label>

          <textarea
            placeholder="Write your feedback here..."
            rows="5"
            value={feedback}
            onChange={(event) =>
              setFeedback(event.target.value)
            }
          />
        </div>

        <button
          type="submit"
          className="submit-button"
        >
          Submit Feedback
        </button>

        {submitted && (
          <div className="success-message">
            ✅ Thank you, {name || "Customer"}!
            Your feedback has been submitted successfully.
          </div>
        )}
      </form>
    </section>
  );
}

export default FeedbackForm;