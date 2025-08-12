import { GlitchImage } from "~/components/GlitchImage.js";
import { glitchCatRed, glitchCatBlue, aboutPicture } from "~/utils/images.js";

export default function About() {
  return (
    <div>
      <section className="text-center max-w-screen-md mx-auto">
        <GlitchImage srcTop={glitchCatRed} srcBottom={glitchCatBlue} alt="glitch kitty" />
        <p className="text-cream-200 text-2xl font-normal tracking-wider pb-4 pt-6">
          Branding - Product Design - Full-stack Engineering
        </p>
        <h1 className="text-cream-100 text-6xl font-bold">
          I find creativity in every stage of the development cycle.
        </h1>
      </section>

      <section className="px-4 py-24 flex max-w-screen-lg mx-auto gap-8">
        <div className="flex w-1/2">
          <img
            src={aboutPicture}
            alt="Sydney, blonde female, laughing while in Boone, NC"
            className="w-full"
          />
        </div>
        <div className="w-1/2 text-cream-200 text-xl font-normal space-y-6 pt-4">
          <p>
            If human is on laptop sit on the keyboard spot something, big eyes, big eyes, crouch,
            shake butt, prepare to pounce, but give attitude. Be superior then cats take over the
            world  meow.
          </p>

          <p>
            If human is on laptop sit on the keyboard spot something, big eyes, big eyes, crouch,
            shake butt, prepare to pounce, but give attitude. 
          </p>
        </div>
      </section>
    </div>
  );
}
