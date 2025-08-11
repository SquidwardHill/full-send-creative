import { FaGithub, FaDribbble } from "react-icons/fa";
import { Link } from "@remix-run/react";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 border-t border-indigo-400">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between gap-10">
        {/* Left side */}
        <div>
          <h2 className="text-lg font-semibold text-gray-200">The Magic Lab</h2>
          <p className="mt-1 text-sm tracking-wider">DESIGN AND DEVELOPMENT BY SYDNEY HILL</p>

          {/* Social icons */}
          <div className="flex gap-5 mt-6 text-pink-500 text-2xl">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer">
              <FaDribbble />
            </a>
          </div>
        </div>

        {/* Right side */}
        <div>
          <h3 className="text-gray-200 font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/case-studies" className="text-pink-500 italic hover:underline">
                CASE STUDIES
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-pink-500 italic hover:underline">
                ABOUT
              </Link>
            </li>
            <li>
              <Link to="/resume" className="text-pink-500 italic hover:underline">
                RESUME
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
