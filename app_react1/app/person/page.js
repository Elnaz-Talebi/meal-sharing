import Image from "next/image";
import styles from "../page.module.css";

function Person() {
  const name = "Eli";
  const age = 30;
  return (
    <>
      <div>Name: {name}</div>
      <div>Age: {age}</div>
      {age >= 20 ? `${name} is an adult` : `${name} is a minor`}
    </>
  );
}

export default function Page() {
  return (
    <div>
      <Person />
    </div>
  );
}
