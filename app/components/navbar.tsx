import { useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "@remix-run/react";

// Define the enum for navigation item types
enum NavItemType {
  TEXT = 'TEXT',
  ICON = 'ICON'
}

// Define the type for navigation items
type NavItem = {
  id: number;
  text: string;
  href: string;
  type: NavItemType;
  icon?: string; // Optional icon name if type is ICON
}

export default function Navbar() {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items
  const navItems: NavItem[] = [
    { id: 2, text: "About", href: "/about", type: NavItemType.TEXT },
    { id: 3, text: "Resume", href: "/resume", type: NavItemType.TEXT },
    { id: 4, text: "sydneyehill@gmail.com", href: "mailto:sydneyehill@gmail.com", type: NavItemType.TEXT },
    { id: 5, text: "Dribbble", href: "https://www.linkedin.com/in/sydneyhill/", type: NavItemType.ICON, icon: "fa6-brands:dribbble" },
    { id: 6, text: "GitHub", href: "https://github.com/sydneyhill", type: NavItemType.ICON, icon: "fa6-brands:github" }
  ];

  return (
    <div>
      <div className="flex justify-between items-center max-w-screen-xl mx-auto h-full px-2 2xl:px-16">
        <Link to="/">
          <h1 className="text-3xl font-bold text-bubblegum-500">✨</h1>
        </Link>

        <div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.href}
                className="p-4 hover:text-bubblegum rounded-xl m-2 cursor-pointer duration-300">
                {item.type === NavItemType.ICON ? (
                  <Icon icon={item.icon!} className="w-8 h-8" />
                ) : (
                  item.text
                )}
              </Link>
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
        <div className={nav ? "fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-[#ecf0f3] p-10 ease-in duration-500" : "fixed left-[-100%] top-0 p-10 ease-in duration-500"}>
          <div>
            <div className="flex w-full items-center justify-between">
              <Link to="/">
                <h1 className="text-3xl font-bold text-bubblegum-500">SH</h1>
              </Link>
              <div onClick={handleNav} className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer">
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
                to={item.href}
                className="p-4 border-b rounded-xl hover:text-bubblegum duration-300 cursor-pointer"
              >
                {item.type === NavItemType.ICON ? (
                  <Icon icon={item.icon!} className="w-16 h-16" />
                ) : (
                  item.text
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
