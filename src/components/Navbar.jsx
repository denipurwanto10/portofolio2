import { useState, useEffect } from "react";

const Navbar = ({ hidden = false }) => {
  if (hidden) return null;

  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => setActive(window.scrollY > 150);
    handleScroll(); // init posisi saat mount
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="navbar relative z-50 py-7 flex items-center justify-center px-6 md:px-12">
      <ul
        className={`flex items-center sm:gap-10 gap-4
          fixed left-1/2 -translate-x-1/2
          md:fixed md:left-1/2 md:-translate-x-1/2
          md:top-8
          md:opacity-100 bg-white/10 backdrop-blur-md
          md:bg-white/10 md:backdrop-blur-md
          px-8 py-3 rounded-2xl border border-white/20
          transition-all md:transition-none
          ${active ? "top-4 opacity-100" : "-top-10 opacity-0"}`}
      >
        <li><a href="#home" className="sm:text-lg text-base font-medium text-white">Home</a></li>
        <li><a href="#about" className="sm:text-lg text-base font-medium text-white">About</a></li>
        <li><a href="#resume" className="sm:text-lg text-base font-medium text-white">Resume</a></li>
        <li><a href="#project" className="sm:text-lg text-base font-medium text-white">Project</a></li>
        <li><a href="#contact" className="sm:text-lg text-base font-medium text-white">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
