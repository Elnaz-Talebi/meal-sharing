import "./HomePage.css";
import MealsList from "../MealsList/MealsList";
import Link from "next/link";
import Header from "../Header";
import Footer from "../Footer";

function HomePage() {
  return (
    <div className="home-page">
      <Header />
      <h1>Welcome to Meal Sharing</h1>
      <h2>Enjoy delicious meals from our community</h2>
      <MealsList limit={3} />
      <Link href="/meals">
        <button>See All Meals</button>
      </Link>
      <Footer />
    </div>
  );
}

export default HomePage;
