import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <Link to="/">Top 1000 Comics</Link>
      <br />
      <Link to="/cancelled">Cancelled Comics</Link>
      <br />
    </div>
  );
};

export default Navbar;
