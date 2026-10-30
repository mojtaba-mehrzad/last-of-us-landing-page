import { useState } from "react";

const links = [["Home", "#home"], ["Ellie", "#ellie"], ["Abby", "#abby"], ["The end", "#ending"]];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="site-nav" aria-label="Main navigation" onKeyDown={(event) => {
      if (event.key === "Escape") setOpen(false);
    }}>
      <a href="#home" aria-label="The Last of Us: back to top" onClick={() => setOpen(false)}>
        <img src={`${import.meta.env.BASE_URL}assets/images/fireflies.svg`} alt="" className="nav-logo" />
      </a>
      <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="site-menu"
        aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>
        <span></span><span></span>
      </button>
      <div id="site-menu" className="site-menu" hidden={!open}>
        {links.map(([label, href]) => (
          <a href={href} key={href} onClick={() => setOpen(false)}>{label}</a>
        ))}
      </div>
    </nav>
  );
}
