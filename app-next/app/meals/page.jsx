"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MealsList from "@/components/MealsList/MealsList";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import "./meals.css";
import { Suspense } from "react";

export default function MealsPage() {
  return (
    <Suspense
      fallback={
        <main style={{ padding: "2rem" }}>
          <p>Loading...</p>
        </main>
      }
    >
      <MealsPageContent />
    </Suspense>
  );
}

function MealsPageContent() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";
  const [sortKey, setSortKey] = useState("");
  const [sortDir, setSortDir] = useState("");

  return (
    <>
      <Header />
      <main style={{ padding: "2rem" }}>
        <div className="sort-controls">
          <label>
            Sort by:
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
            >
              <option value="">No sort</option>
              <option value="title">Title</option>
              <option value="when">When</option>
              <option value="max_reservations">Max Reservations</option>
              <option value="price">Price</option>
            </select>
          </label>
          <label>
            Sort direction:
            <select
              value={sortDir}
              onChange={(e) => setSortDir(e.target.value)}
            >
              <option value="">No direction</option>
              <option value="asc">↑ Ascending</option>
              <option value="desc">↓ Descending</option>
            </select>
          </label>
        </div>
        <MealsList searchTitle={title} sortKey={sortKey} sortDir={sortDir} />
      </main>
      <Footer />
    </>
  );
}
