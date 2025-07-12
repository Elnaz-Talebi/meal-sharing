"use client";

import Link from "next/link";
import Image from "next/image";
import "./Meal.css";

export default function Meal({ meal }) {
  const imagePath = `/images/meals/${meal.title.replace(/\s+/g, "-")}.png`;

  return (
    <div className="meal-card">
      <Image
        src={imagePath}
        alt={meal.title}
        width={300}
        height={200}
        style={{ width: "100%", height: "auto", borderRadius: "8px" }}
      />
      <h3>{meal.title}</h3>
      <p>{meal.description}</p>
      <p>
        <strong>Price:</strong> {meal.price} DKK
      </p>

      <div className="meal-actions">
        <Link href={`/meals/${meal.id}/review`}>
          <button className="review-button">Leave Review</button>
        </Link>
        <Link href={`/meals/${meal.id}`}>
          <button className="reserve-button">Reserve</button>
        </Link>
      </div>
    </div>
  );
}
