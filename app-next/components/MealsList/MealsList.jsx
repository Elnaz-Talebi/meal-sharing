"use client";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import styles from "./MealsList.css";

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
        <h1 className={styles.meal_title}>Meals</h1>

        {Meals?.length ? (
          <>
            {Meals.map((item) => (
              <>
                <div className="meal_item" key={item.id}>
                  <span className="meal_label">Title:</span> {item.title} <br />
                  <span className="meal_label">Description:</span>{" "}
                  {item.description} <br />
                  <span className="meal_label">Price:</span> {item.price} DKK
                  <hr />
                </div>
              </>
            ))}
          </>
        ) : (
          <p>Loading meals...</p>
        )}
      </section>
    </>
  );
}
