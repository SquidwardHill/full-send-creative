import { useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "@remix-run/react";
import { logoText, logo } from "~/utils/images.js";
import SocialIcon from "./SocialIcon.js";
import quickLinksData from "~/data/quick-links.json" with { type: "json" };
import type { QuickLink } from "../types/navigation.js";

export default function Navbar() {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  // Get navigation and social links from quick-links data
  const navItems: QuickLink[] = quickLinksData.filter(
    (link) => link.category === "navigation"
  ) as QuickLink[];

  const socialItems: QuickLink[] = quickLinksData.filter(
    (link) => link.category === "social"
  ) as QuickLink[];

  return (
    <div>
      <div className="relative z-10 flex justify-between items-center max-w-screen-lg mx-auto h-full px-2 py-4">
        <Link to="/" className="w-20 py-4">
          <img src={logoText} alt="Black Cat Logo" />
        </Link>

        <div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.to}
                className="p-4 text-cream-100 hover:text-cream-300 font-light font-mono text-sm tracking-wide m-2 cursor-pointer duration-300"
              >
                {item.label}
              </Link>
            ))}

            {/* Social icons */}
            {socialItems.map((item) => (
              <a
                key={item.id}
                href={item.to}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 text-cream-100 hover:text-cream-300 rounded-xl m-2 cursor-pointer duration-300"
              >
                <SocialIcon name={item.icon as any} className="w-6 h-6" />
              </a>
            ))}
          </div>

          {/* Mobile Navigation Button */}
          <div onClick={handleNav} className="md:hidden cursor-pointer">
            <Icon icon="mdi:menu" className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={nav ? "md:hidden fixed left-0 top-0 w-full h-screen bg-black/70" : ""}>
        <div
          className={
            nav
              ? "fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-[#ecf0f3] p-10 ease-in duration-500"
              : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
          }
        >
          <div>
            <div className="flex w-full items-center justify-between">
              <Link to="/">
                <img src={logo} alt="Black Cat Logo" />
              </Link>
              <div
                onClick={handleNav}
                className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer"
              >
                <Icon icon="mdi:close" className="w-8 h-8" />
              </div>
            </div>
            <div className="border-b border-gray-300 my-4">
              <p className="w-[85%] md:w-[90%] py-4">Let's build something together</p>
            </div>
          </div>
          <div className="py-4 flex flex-col">
            {/* Mobile Navigation Items */}
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.to}
                className="p-4 border-b rounded-xl text-cream-200 hover:text-cream-300 duration-300 cursor-pointer"
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile Social Items */}
            {socialItems.map((item) => (
              <a
                key={item.id}
                href={item.to}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border-b rounded-xl text-cream-200 hover:text-cream-300 duration-300 cursor-pointer"
              >
                <SocialIcon name={item.icon as any} className="w-16 h-16" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
