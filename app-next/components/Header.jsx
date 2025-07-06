import Link from "next/link";
import "./HeaderFooter.css";

function Header() {
  return (
    <header className="main-header">
      <nav>
        <ul className="nav-menu">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about-us">About Us</Link>
          </li>
          <li>
            <Link href="/meals">Meals</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
