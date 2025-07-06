"use client";

import Link from "next/link";
import "./Meal.css";

export default function Meal({ meal }) {
  return (
    <div className="meal-card">
      <h3>{meal.title}</h3>
      <p>{meal.description}</p>
      <p>
        <strong>Price:</strong> {meal.price} DKK
      </p>

      <div className="meal-actions">
        <Link href={`/meals/${meal.id}/review`}>
          <button className="review-button">Leave Review</button>
        </Link>
      </div>
    </div>
  );
}
