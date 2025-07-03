"use client";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import "./MealsList.css";
import Meal from "./Meal.jsx";

export default function MealsList({ limit }) {
  const [Meals, setMeals] = useState();

  useEffect(() => {
    async function fetchMeals() {
      const result = await fetch(api("/meals"));
      const jsonResult = await result.json();
      setMeals(jsonResult);
    }
    fetchMeals();
  }, []);

  const mealsToShow = limit ? Meals?.slice(0, limit) : Meals;

  return (
    <section>
      <h1 className="meal_title">Meals</h1>

      {mealsToShow?.length ? (
        <div className="meals-grid">
          {mealsToShow.map((meal) => (
            <Meal key={meal.id} meal={meal} />
          ))}
        </div>
      ) : (
        <p>Loading meals...</p>
      )}
    </section>
  );
}
