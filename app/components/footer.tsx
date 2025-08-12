import InlineLink from "./typography/InlineLink.js";
import SocialIcon from "./SocialIcon.js";
import quickLinksData from "~/data/quick-links.json" with { type: "json" };
import type { QuickLink } from "~/types/navigation.js";

export default function Footer() {
  const quickLinks: QuickLink[] = quickLinksData.filter(
    (link) => link.category === "navigation"
  ) as QuickLink[];

  const socialLinks: QuickLink[] = quickLinksData.filter(
    (link) => link.category === "social"
  ) as QuickLink[];

  return (
    <footer className=" text-cream-100 border-t border-indigo-400 max-w-screen-lg mx-auto">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between gap-10">
        {/* Left side */}
        <div>
          <h2 className="text-lg font-semibold text-gray-200">The Magic Lab</h2>
          <p className="mt-1 text-sm tracking-wider">DESIGN AND DEVELOPMENT BY SYDNEY HILL</p>

          {/* Social icons */}
          <div className="flex gap-5 mt-6 text-pink-500 text-2xl">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.to}
                target="_blank"
                rel="noopener noreferrer"
                title={link.description}
                className="hover:text-bubblegum-400 transition-colors"
              >
                <SocialIcon name={link.icon as any} />
              </a>
            ))}
          </div>
        </div>

        {/* Right side */}
        <div>
          <h3 className="text-gray-200 font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.id}>
                <InlineLink to={link.to} variant="thin">
                  {link.label}
                </InlineLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
