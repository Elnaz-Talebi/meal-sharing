"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./ReviewFormPage.css";

export default function ReviewFormPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    stars: 1,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const review = {
      ...form,
      meal_id: Number(id),
      stars: Number(form.stars),
      created_date: new Date().toISOString().slice(0, 19).replace("T", " "),
    };

    try {
      const res = await fetch("http://localhost:3001/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      });

      if (res.ok) {
        alert("Review submitted!");
        router.push("/meals");
      } else {
        alert("Failed to submit review.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <>
      <Header />
      <div className="review-form-container">
        <h2>Leave a Review</h2>
        <form onSubmit={handleSubmit} className="review-form">
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Description:
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Stars:
            <select
              name="stars"
              value={form.stars}
              onChange={handleChange}
              required
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </label>

          <button type="submit">Submit Review</button>
        </form>
      </div>
      <Footer />
    </>
  );
}
