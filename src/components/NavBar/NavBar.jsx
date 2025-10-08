import React from "react";

export default function NavBar() {
  return (
    <nav>
      <img src={`${import.meta.env.BASE_URL}assets/images/fireflies.svg`} alt="" className="w-15"/>
      <img src={`${import.meta.env.BASE_URL}assets/images/menu.svg`} alt="" className="w-10"/>
    </nav>
  );
}
