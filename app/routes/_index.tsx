import type { MetaFunction } from "@vercel/remix";
import { divider, handsDivider, sparkle, statService, courtReso, complyantPlaidIntegration, complyantIrs4868 } from "../images/Index";

export const meta: MetaFunction = () => {
  return [
    { title: "Full Send Creative" },
    { name: "description", content: "Welcome to Sydney Hill's MySpace" },
  ];
};

export default function Index() {
  return <div>
         {/* Hero Section */}
         <section className="px-4 pt-16 text-center max-w-screen-md mx-auto">
         <p className="font-sans text-2xl tracking-[4px] text-cream-200 pb-4">Alchemist Archive, Duality Potion</p>
          <h1 className="text-cream-100 text-5xl font-bold leading-tight">I distill complex ideas into functional, aesthetic systems.</h1>
          </section>

          {/* Divider */}
        <div className="p-4 m-4 max-w-screen-lg mx-auto"> <img src={divider} alt="divider" className="w-full" /></div>
          
          {/* About Section */}
          <section className="px-8 px-md-16 pt-0 text-center max-w-screen-lg mx-auto">
            <p className="text-cream-200 text-2xl font-normal tracking-normal pb-6 leading-relaxed">I'm a designer and full-stack developer who blends creativity, logic, and intuition to build thoughtful digital experiences. My magic lies in distilling ideas into clear, usable systems—whether designing scalable UI patterns or developing the infrastructure beneath them. Explore my work to see how ideas take shape.</p>
            <a className="font-sans tracking-[3px] text-2xl text-bubblegum-400">Read More →</a>
          </section>

          {/* Work Section */}
          <section className="px-4 pt-32 text-center max-w-screen-md mx-auto">
            <p className="text-cream-100 text-4xl font-bold pb-8 font-sans tracking-[3px]">Spellcraft <img src={sparkle} alt="sparkle" className="inline-block w-12 ml-2" /></p>
          </section>

          <section className="flex flex-wrap max-w-screen-lg mx-auto">
            <a className="flex w-1/2 text-decoration-none border-none" href={`/case-study/in-app-reservations`}>
              <img src={statService} alt="Stat Service" className="w-full" />
            </a>
            <a className="flex w-1/2 text-decoration-none border-none" href={`/case-study/in-app-reservations`}>
              <img src={courtReso} alt="Court Reservation Feature" className="w-full" />
            </a>
            <a className="flex w-1/2 text-decoration-none border-none" href={`/case-study/in-app-reservations`}>
              <img src={complyantIrs4868} alt="IRS 4868 Extension Filing Feature" className="w-full" />
            </a>
            <a className="flex w-1/2 text-decoration-none border-none" href={`/case-study/in-app-reservations`}>
              <img src={complyantPlaidIntegration} alt="Plaid Integration" className="w-full" />
            </a>
          </section>

          <section className="px-4 pt-24 text-center max-w-screen-md mx-auto">
            <p className="text-cream-100 text-4xl font-bold pb-8 font-sans tracking-[3px]">Rituals & Ingredients <img src={sparkle} alt="sparkle" className="inline-block w-12 ml-2" /></p>
            {/* <SkillRow /> */}
          </section>

    </div>
}
