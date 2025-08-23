import { sydneyPic } from "~/utils/images.js";

export default function About() {
  return (
    <div>
      <section className="text-center max-w-screen-lg mx-auto">
        <div className="grid grid-cols-4 gap-8 items-center ">
          <div className="col-span-1">
            <img src={sydneyPic} alt="Sydney Hill" className="w-full" />
          </div>
          <div className="col-span-3 text-left flex flex-col">
            <h4 className="text-cream-100 text-lg font-semibold font-sans uppercase tracking-wider mb-2">
              I'm Sydney-
            </h4>
            <p className="text-cream-200 text-lg pb-6 text-left">
              I'm a designer and full-stack developer who thrives on blending creativity, logic, and
              intuition. Whether shaping interfaces or engineering seamless functionality, my magic
              lies in transforming ideas into thoughtfully crafted experiences.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
