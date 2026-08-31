import { useState } from "react";

function FeedbackForm({ onAddReview }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedFeedback = feedback.trim();

    if (
      !trimmedName ||
      !trimmedPhone ||
      !rating ||
      !trimmedFeedback
    ) {
      alert("Please complete all fields and choose a rating.");
      return;
    }

    setIsSubmitting(true);
    setSubmitted(false);
    setSubmitError("");

    try {
      await onAddReview({
        name: trimmedName,
        phone: trimmedPhone,
        rating,
        feedback: trimmedFeedback,
      });

      setSubmittedName(trimmedName);
      setName("");
      setPhone("");
      setRating(0);
      setFeedback("");
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setSubmitError(
        "Could not submit your feedback right now. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="feedback-section" id="feedback">
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
                disabled={isSubmitting}
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
            disabled={isSubmitting}
            onChange={(event) =>
              setFeedback(event.target.value)
            }
          />
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </button>

        {submitError && (
          <div className="error-message">
            {submitError}
          </div>
        )}

        {submitted && (
          <div className="success-message">
            ✅ Thank you, {submittedName || "Customer"}!
            Your feedback has been submitted successfully.
          </div>
        )}
      </form>
    </section>
  );
}

export default FeedbackForm;
