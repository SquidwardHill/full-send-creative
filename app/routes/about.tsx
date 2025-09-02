import { GlitchImage } from "~/components/GlitchImage.js";
import {
  coffinBlue,
  coffinPink,
  sydneyCollageDesktop,
  sydneyCollageMobile,
} from "~/utils/images.js";

export default function About() {
  return (
    <div>
      <section className="text-left max-w-screen-lg mx-auto md:py-8">
        <div className="max-w-[400px] md:max-w-screen-md grid grid-cols-1 md:grid-cols-6 md:gap-8 mr-8 md:mx-auto">
          <div className="md:col-span-2 ">
            <GlitchImage
              srcTop={coffinPink}
              srcBottom={coffinBlue}
              alt="Sydney Hill"
              className="w-42 h-42 md:w-56 md:h-56"
            />
          </div>
          <div className="md:col-span-4 px-4 md:px-0 mt-2 md:mt-0">
            <p className="text-bubblegum-400 text-xs md:text-base uppercase italic font-light tracking-wider mb-2 md:mb-4 mt-4 md:mt-8">
              I'm Sydney-
            </p>
            <p className="text-cream-200 text-md font-light">
              I'm a designer and full-stack developer who thrives on blending creativity, logic, and
              intuition. Whether shaping interfaces or engineering seamless functionality, my magic
              lies in transforming ideas into thoughtfully crafted experiences.
            </p>
          </div>
        </div>
        <div className="w-full sm:max-w-[480px] md:max-w-screen-lg px-8 mx-auto my-12">
          <picture>
            {/* Mobile & tablet */}
            <source media="(max-width: 768px" srcSet={sydneyCollageMobile} />
            {/* Desktop */}
            <source media="(min-width: 1025px)" srcSet={sydneyCollageDesktop} />
            {/* Fallback */}
            <img src={sydneyCollageDesktop} alt="Sydney Hill" className="w-full" />
          </picture>
        </div>
        <div className="max-w-[400px] md:max-w-screen-md mx-auto px-4 md:px-0 ">
          <p className="text-cream-200 text-md ">
            Off the clock, I’m usually chasing flow in the mountains. I’m drawn to the outdoors and
            the rhythm of the seasons, using different modes to experience the landscape as it
            changes. In summer you’ll find me mountain biking, climbing, or running; when the snow
            falls, I’m out pow-surfin’ 🤙.
          </p>
        </div>
      </section>
    </div>
  );
}
