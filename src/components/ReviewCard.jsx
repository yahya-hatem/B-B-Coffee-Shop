function ReviewCard({ review }) {
  const name = review.name || "Customer";
  const rating = Math.min(
    Math.max(Number(review.rating) || 0, 0),
    5
  );

  return (
    <article className="review-card">
      <div className="review-header">
        <div className="review-avatar">
          {name.charAt(0).toUpperCase()}
        </div>

        <div>
          <h3>{name}</h3>

          <div className="review-stars">
            {"★".repeat(rating)}
            <span>
              {"★".repeat(5 - rating)}
            </span>
          </div>
        </div>
      </div>

      <p className="review-text">
        "{review.feedback || "No feedback text provided."}"
      </p>
    </article>
  );
}

export default ReviewCard;
