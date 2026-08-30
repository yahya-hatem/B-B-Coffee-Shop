function ReviewCard({ review }) {
  return (
    <article className="review-card">
      <div className="review-header">
        <div className="review-avatar">
          {review.name.charAt(0).toUpperCase()}
        </div>

        <div>
          <h3>{review.name}</h3>

          <div className="review-stars">
            {"★".repeat(review.rating)}
            <span>
              {"★".repeat(5 - review.rating)}
            </span>
          </div>
        </div>
      </div>

      <p className="review-text">
        "{review.feedback}"
      </p>
    </article>
  );
}

export default ReviewCard;