// Landing.js
import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="landingpagebuttons">
      <p>If we are new to you, please select signup</p>

      <Link to="/login">
        <button>Login</button>
      </Link>

      <Link to="/signup">
        <button>Signup</button>
      </Link>
    </div>
  );
}

export default LandingPage;
