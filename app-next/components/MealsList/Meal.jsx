"use client";


export default function Meal({ meal }) {
  return (
    <div className="meal-card">
      <h3>{meal.title}</h3>
      <p>{meal.description}</p>
      <p><strong>Price:</strong> {meal.price} DKK</p>
    </div>
  );
}
