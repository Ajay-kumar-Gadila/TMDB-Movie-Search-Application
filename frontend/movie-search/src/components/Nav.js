import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="navbar bg-body-tertiary ">
      <div className="container">
        <span>
          <Link to="/">The Movie Finder</Link>
        </span>
      </div>
    </nav>
  );
}
