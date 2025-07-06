"use client";

import { useEffect, useState } from "react";
import api from "@/utils/api";
import "./MealsList.css";
import Meal from "./Meal.jsx";

export default function MealsList({ limit }) {
  const [Meals, setMeals] = useState();

  useEffect(() => {
    async function fetchMeals() {
      try {
        const result = await fetch(api("/meals"));
        const jsonResult = await result.json();

        if (jsonResult.length === 0) {
          setMeals([]);
        } else {
          setMeals(jsonResult);
        }
      } catch (err) {
        console.error("Error fetching meals:", err);
        setMeals([]);
      }
    }

    fetchMeals();
  }, []);

  const mealsToShow = limit ? Meals?.slice(0, limit) : Meals;

  return (
    <section>
      <h1 className="meal_title">Meals</h1>

      {mealsToShow === undefined ? (
        <p>Loading meals...</p>
      ) : mealsToShow.length === 0 ? (
        <p>No meals available.</p>
      ) : (
        <div className="meals-grid">
          {mealsToShow.map((meal) => (
            <Meal key={meal.id} meal={meal} />
          ))}
        </div>
      )}
    </section>
  );
}
