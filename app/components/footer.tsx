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
    <footer className=" text-cream-100  max-w-screen-lg mx-auto px-4 pb-32 pt-12 ">
      <div className="border-t border-bubblegum-300/50 py-8"></div>
      <div className=" flex flex-col md:flex-row justify-between gap-10 ">
        {/* Left side */}
        <div>
          <h2 className="text-lg font-semibold text-cream-100">The Black Cat</h2>
          <p className="mt-2 text-sm tracking-wider text-cream-200 uppercase">
            A collection of work by Sydney Hill
          </p>

          {/* Social icons */}
          <div className="flex gap-5 mt-8 text-bubblegum-300 text-2xl">
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
          <h3 className="text-cream-100 font-semibold mb-3 tracking-wider">Quick Links</h3>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.id}>
                <InlineLink
                  to={link.to}
                  variant="thin"
                  className="uppercase text-sm tracking-wider text-bubblegum-300"
                >
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
