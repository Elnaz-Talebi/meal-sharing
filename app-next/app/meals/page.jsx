"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MealsList from "@/components/MealsList/MealsList";

export default function MealsPage() {
  return (
    <>
      <Header />
      <main style={{ padding: "2rem" }}>
        <MealsList />
      </main>
      <Footer />
    </>
  );
}
