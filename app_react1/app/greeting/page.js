import Image from "next/image";
import styles from "../page.module.css";

function Greeting() {
  return <h1>Hello, React!</h1>;
}

export default function Page() {
  return (
    <div>
      <Greeting />
    </div>
  );
}
