"use client";
import "./MealDetailsPage.css";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MealDetailsPage() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const formRef = useRef(null);

  async function fetchMeal() {
    try {
      const response = await fetch(`http://localhost:3001/api/meals/${id}`);
      const data = await response.json();
      setMeal(data);
    } catch (error) {
      console.error("Error fetching meal:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMeal();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!meal) return <p>Meal not found</p>;

  return (
    <>
      <Header />

      <div className="meal-details-container">
        <h1>{meal.title}</h1>
        <p>Description: {meal.description}</p>
        <p>Price: {meal.price}</p>
        <p>Date: {meal.when}</p>
        <p>Max Reservations: {meal.max_reservations}</p>

        {meal.available_reservations > 0 ? (
          <form
            ref={formRef}
            className="reservation-form"
            onSubmit={async (e) => {
              e.preventDefault();
              const name = e.target.name.value;
              const email = e.target.email.value;
              const phone = e.target.phone.value;
              const guests = Number(e.target.guests.value);

              const reservation = {
                contact_name: name,
                contact_email: email,
                contact_phonenumber: phone,
                meal_id: meal.id,
                number_of_guests: guests,
                created_date: new Date()
                  .toISOString()
                  .slice(0, 19)
                  .replace("T", " "),
              };

              try {
                const response = await fetch(
                  "http://localhost:3001/api/reservations",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(reservation),
                  }
                );

                if (response.ok) {
                  alert("Reservation successful!");
                  formRef.current.reset();
                  fetchMeal();
                } else {
                  alert("Reservation failed.");
                }
              } catch (err) {
                alert("An error occurred. Please try again.");
                console.error(err);
              }
            }}
          >
            <h2>Book a Seat</h2>
            <label>
              Name:
              <input type="text" name="name" required />
            </label>
            <br />
            <label>
              Email:
              <input type="email" name="email" required />
            </label>
            <br />
            <label>
              Phone Number:
              <input type="tel" name="phone" required />
            </label>
            <br />
            <p>Available Seats: {meal.available_reservations}</p>
            <label>
              Number of Guests:
              <select name="guests" required>
                {Array.from({ length: meal.available_reservations }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <button type="submit">Book Seat</button>
          </form>
        ) : (
          <p>No seats available for this meal.</p>
        )}
      </div>

      <Footer />
    </>
  );
}
