"use client";

import { useEffect, useState } from "react";
import api from "@/utils/api";
import "./MealsList.css";
import Meal from "./Meal.jsx";

export default function MealsList({ limit, searchTitle, sortKey, sortDir }) {
  const [Meals, setMeals] = useState();

  useEffect(() => {
    async function fetchMeals() {
      try {
        let url = api("/meals");
        const params = new URLSearchParams();

        if (searchTitle) {
          params.append("title", searchTitle);
        }

        if (sortKey) {
          params.append("sortKey", sortKey);
        }

        if (sortDir) {
          params.append("sortDir", sortDir);
        }

        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        const result = await fetch(url);
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
  }, [searchTitle, sortKey, sortDir]);

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
