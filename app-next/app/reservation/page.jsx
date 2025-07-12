"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import api from "@/utils/api";
import "../meals/[id]/MealDetailsPage.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ReservationPage() {
  const searchParams = useSearchParams();
  const mealId = searchParams.get("mealId");
  const [mealTitle, setMealTitle] = useState("");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    async function fetchMeals() {
      if (mealId) {
        const res = await fetch(api(`/meals/${mealId}`));
        const meal = await res.json();
        setMealTitle(meal.title || "");
        setSelectedMeal(meal);
        setLoading(false);
      } else {
        const res = await fetch(api("/meals"));
        const data = await res.json();
        setMeals(data);
        setLoading(false);
      }
    }
    fetchMeals();
  }, [mealId]);

  useEffect(() => {
    if (!mealId && mealTitle) {
      const meal = meals.find((m) => m.title === mealTitle);
      if (meal) {
        fetch(api(`/meals/${meal.id}`))
          .then((res) => res.json())
          .then((data) => setSelectedMeal(data));
      } else {
        setSelectedMeal(null);
      }
    }
    if (!mealId && !mealTitle) {
      setSelectedMeal(null);
    }
  }, [mealTitle, mealId, meals]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!selectedMeal) return;
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const guests = Number(e.target.guests.value);
    if (guests > selectedMeal.available_reservations) {
      alert("Number of guests cannot be more than available seats.");
      return;
    }
    const reservation = {
      contact_name: name,
      contact_email: email,
      contact_phonenumber: phone,
      meal_id: selectedMeal.id,
      number_of_guests: guests,
      created_date: new Date().toISOString().slice(0, 19).replace("T", " "),
    };
    try {
      const response = await fetch(api("/reservations"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservation),
      });
      if (response.ok) {
        alert("Reservation successful!");
        formRef.current.reset();
        const meal = await fetch(api(`/meals/${selectedMeal.id}`)).then((res) =>
          res.json()
        );
        setSelectedMeal(meal);
      } else {
        alert("Reservation failed.");
      }
    } catch (err) {
      alert("An error occurred. Please try again.");
    }
  }

  if (loading)
    return (
      <main style={{ padding: "2rem" }}>
        <p>Loading...</p>
      </main>
    );

  return (
    <>
      <Header />
      <main className="meal-details-container">
        <h1>Reservation Form</h1>
        <form
          className="reservation-form"
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <label>
            Meal Title:
            {mealId ? (
              <input type="text" value={mealTitle} disabled />
            ) : (
              <select
                value={mealTitle}
                onChange={(e) => setMealTitle(e.target.value)}
                required
                name="mealTitle"
              >
                <option value="">Select a meal</option>
                {meals.map((meal) => (
                  <option key={meal.id} value={meal.title}>
                    {meal.title}
                  </option>
                ))}
              </select>
            )}
          </label>
          {selectedMeal && (
            <p>Available Seats: {selectedMeal.available_reservations}</p>
          )}
          <label>
            Name:
            <input type="text" name="name" required />
          </label>
          <label>
            Email:
            <input type="email" name="email" required />
          </label>
          <label>
            Phone Number:
            <input type="tel" name="phone" required />
          </label>
          <label>
            Number of Guests:
            <input type="number" name="guests" min="1" required />
          </label>
          <button type="submit">Reserve</button>
        </form>
      </main>
      <Footer />
    </>
  );
}
