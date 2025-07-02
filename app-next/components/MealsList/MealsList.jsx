"use client";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import "./MealsList.css";
import Meal from "./Meal.jsx";

export default function MealsList() {
  const [Meals, setMeals] = useState();

  useEffect(() => {
    async function fetchMeals() {
      const result = await fetch(api("/meals"));
      const jsonResult = await result.json();
      setMeals(jsonResult);
    }
    fetchMeals();
  }, []);
  return (
    <>
      <section>
        <h1 className="meal_title">Meals</h1>

        {Meals?.length ? (
          <div className="meals-grid">
            {Meals.map((meal) => (
              <Meal key={meal.id} meal={meal} />
            ))}
          </div>
        ) : (
          <p>Loading meals...</p>
        )}
      </section>
    </>
  );
}
