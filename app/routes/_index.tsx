import type { MetaFunction } from "@vercel/remix";
import { divider, sparkle, statService, courtReso, complyantPlaidIntegration, complyantIrs4868 } from "../images/Index";

export const meta: MetaFunction = () => {
  return [
    { title: "Full Send Creative" },
    { name: "description", content: "Welcome to Sydney Hill's my space" },
  ];
};

export default function Index() {
  return <div>
        {/* <Nav /> */}
        <main className="p-4 max-w-screen-xl mx-auto bg-color-galaxy">
         {/* Hero Section */}
         <section className="px-4 pt-16 text-center max-w-screen-md mx-auto">
          <p className="text-cream-200 text-2xl font-normal tracking-wider pb-6">I'm Sydney - </p>
          <h1 className="text-cream-100 text-6xl font-bold leading-tight">I’m a digital designer and full-stack engineer</h1>
          </section>

          {/* Divider */}
          <img src={divider} alt="divider" className="w-full" />
          
          {/* About Section */}
          <section className="px-4 pt-8 text-center max-w-screen-md mx-auto">
            <p className="text-cream-200 text-2xl font-normal tracking-wider pb-6">If human is on laptop sit on the keyboard spot something, big ederior then cats take over the world  meow.</p>
          </section>

          {/* Work Section */}
          <section className="px-4 pt-16 text-center max-w-screen-md mx-auto">
            <p className="text-cream-100 text-4xl font-bold pb-8">Things I’ve worked on <img src={sparkle} alt="sparkle" className="inline-block w-12 ml-2" /></p>
          </section>

          <section className="flex flex-wrap">
            <a className="flex w-1/2 text-decoration-none border-none" href={`/work/stat-service`}>
              <img src={statService} alt="Stat Service" className="w-full" />
            </a>
            <a className="flex w-1/2 text-decoration-none border-none" href={`/work/stat-service`}>
              <img src={courtReso} alt="Court Reservation Feature" className="w-full" />
            </a>
            <a className="flex w-1/2 text-decoration-none border-none" href={`/work/stat-service`}>
              <img src={complyantIrs4868} alt="IRS 4868 Extension Filing Feature" className="w-full" />
            </a>
            <a className="flex w-1/2 text-decoration-none border-none" href={`/work/stat-service`}>
              <img src={complyantPlaidIntegration} alt="Plaid Integration" className="w-full" />
            </a>
          </section>

          {/* <section className="px-4 pt-24 text-center max-w-screen-md mx-auto">
            <p className="text-cream-100 text-4xl font-bold pb-8">I work with <img src={sparkle} alt="sparkle" className="inline-block w-12 ml-2" /></p>
            <SkillRow />
          </section> */}

        </main>
    </div>
}
