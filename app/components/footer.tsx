import { Icon } from "@iconify/react";
import { Link } from "@remix-run/react";
import { useHydrated } from "~/utils/hooks";

export default function Footer() {
  const isHydrated = useHydrated();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      id: 1,
      text: "Dribbble",
      href: "https://www.linkedin.com/in/sydneyhill/",
      icon: "fa6-brands:dribbble",
    },
    { id: 2, text: "GitHub", href: "https://github.com/sydneyhill", icon: "fa6-brands:github" },
  ];

  return (
    <footer className="w-full bg-cream-200/5">
      <div className="max-w-screen-xl mx-auto  p-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Copyright */}
          <div className="mb-4 md:mb-0">
            <Link to="/">
              <h1 className="text-3xl font-bold text-bubblegum-500">✨</h1>
            </Link>
            <p className="text-sm mt-2">
              © {isHydrated ? currentYear : "2024"} Sydney Hill. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          {/* <div className="flex space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-bubblegum transition-colors duration-300"
              >
                <Icon icon={link.icon} className="w-8 h-8" />
              </a>
            ))}
          </div> */}

          {/* Quick Links */}
          <div className="mt-4 md:mt-0">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
              <Link to="/about" className="hover:text-bubblegum transition-colors duration-300">
                About
              </Link>
              <Link to="/resume" className="hover:text-bubblegum transition-colors duration-300">
                Resume
              </Link>
              <a
                href="mailto:sydneyehill@gmail.com"
                className="hover:text-bubblegum transition-colors duration-300"
              >
                Contact
              </a>
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-bubblegum transition-colors duration-300"
                >
                  <Icon icon={link.icon} className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
