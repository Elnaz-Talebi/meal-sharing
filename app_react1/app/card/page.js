import Image from "next/image";
import styles from "../page.module.css";
import Person from "../person/page.js";

function Card() {
  return (
    <div>
      <h2>Card Title</h2>
      <p>This is a card component</p>
    </div>
  );
}

export default function Page() {
  return (
    <div>
      <Card />
      <Card />
      <Person />
    </div>
  );
}
