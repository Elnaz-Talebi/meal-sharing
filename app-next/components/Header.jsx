"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SearchBox from "./SearchBox";

function Header() {
  const router = useRouter();
  const [input, setInput] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    if (input.trim()) {
      router.push(`/meals?title=${encodeURIComponent(input)}`);
      setInput("");
    }
  }

  return (
    <header className="main-header">
      <nav>
        <ul className="nav-menu">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/reservation">Reservation</Link>
          </li>
          <li>
            <Link href="/meals">Meals</Link>
          </li>
        </ul>
      </nav>
      <SearchBox
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onSubmit={handleSearch}
        placeholder="Search meals by title"
      />
    </header>
  );
}

export default Header;
