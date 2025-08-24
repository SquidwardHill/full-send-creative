import { useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useLocation, useNavigation } from "@remix-run/react";
import { logo, CatPaw } from "~/utils/images.js";
import SocialIcon from "./SocialIcon.js";
import quickLinksData from "~/data/quick-links.json" with { type: "json" };
import type { QuickLink } from "../types/navigation.js";
import { FaPaw } from "react-icons/fa";

export default function Navbar() {
  const [nav, setNav] = useState(false);
  const location = useLocation();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

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
      <div className="relative z-10 flex justify-between items-center max-w-screen-lg mx-auto h-full px-4 py-4">
        <Link to="/" className="w-32 py-4">
          <img src={logo} alt="Black Cat Logo" />
        </Link>

        <div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              const isCurrentLoading = isLoading && location.pathname !== item.to;

              return (
                <Link
                  key={item.id}
                  to={item.to}
                  className={`p-4 font-light font-mono text-sm tracking-wide m-2 cursor-pointer duration-300 transition-all ${
                    isActive
                      ? "text-bubblegum-300 border-b-1 border-bubblegum-300"
                      : isCurrentLoading
                        ? "text-cream-200 opacity-50"
                        : "text-cream-100 hover:text-cream-300 hover:scale-105"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="ml-2 inline-block align-middle w-4 h-4 animate-pulse text-bubblegum-400">
                      <FaPaw />
                    </span>
                  )}
                </Link>
              );
            })}

            {/* Social icons */}
            {socialItems.map((item) => (
              <a
                key={item.id}
                href={item.to}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 text-cream-100 hover:text-cream-300 rounded-xl m-2 cursor-pointer duration-300 hover:scale-110 transition-transform"
              >
                <SocialIcon name={item.icon as any} className="w-6 h-6" />
              </a>
            ))}
          </div>

          {/* Mobile Navigation Button */}
          <div onClick={handleNav} className="md:hidden cursor-pointer mr-2">
            <Icon icon="mdi:menu" className="w-8 h-8 text-bubblegum-300" />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={nav ? "md:hidden fixed left-0 top-0 w-full h-screen  z-50" : ""}>
        <div
          className={
            nav
              ? "fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-galaxy p-10 ease-in duration-500 z-50 shadow-lg shadow-black/50"
              : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
          }
        >
          <div>
            <div className="flex w-full items-center justify-between">
              <Link to="/" onClick={handleNav} className="w-30">
                <img src={logo} alt="The Black Cat Logo" />
              </Link>
              <div onClick={handleNav} className=" p-3 cursor-pointer">
                <Icon icon="fa6-solid:xmark" className="w-6 h-6 text-bubblegum-300" />
              </div>
            </div>
            <div className="border-b border-gray-300 my-4">
              <p className="w-[85%] md:w-[90%] py-4">A collection of work by Sydney Hill</p>
            </div>
          </div>
          <div className="py-4 flex flex-col">
            {/* Mobile Navigation Items */}
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;

              return (
                <Link
                  key={item.id}
                  to={item.to}
                  onClick={handleNav}
                  className={`py-2 duration-300 cursor-pointer transition-all ${
                    isActive
                      ? "text-bubblegum-300 border-l-4 border-bubblegum-300 pl-4"
                      : "text-cream-200 hover:text-cream-300 hover:pl-6"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="ml-2 inline-block align-middle w-4 h-4 animate-pulse text-bubblegum-400">
                      <FaPaw />
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="flex gap-8 py-8">
              {/* Mobile Social Items */}
              {socialItems.map((item) => (
                <a
                  key={item.id}
                  href={item.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" text-cream-200 hover:text-cream-300 duration-300 cursor-pointer"
                >
                  <SocialIcon name={item.icon as any} className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
