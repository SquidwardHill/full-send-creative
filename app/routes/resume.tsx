import ResumeSection from "~/components/ResumeSection.js";
import SectionTitleDivider from "~/components/typography/SectionTitleDivider.js";

export default function Resume() {
  return (
    <div>
      <section id="resume" className="max-w-5xl mx-auto px-6 pb-16 md:pt-16">
        <header className="mb-16 text-center">
          <h2 className="text-4xl font-extrabold text-cream-100">
            Product Design &amp; Full Stack Engineering
          </h2>
          <p className="mt-2 text-cream-200">Truckee, California</p>
          <p className="mt-2">
            <a
              href="mailto:sydneyehill@gmail.com"
              className="text-bubblegum-300 hover:underline hover:text-bubblegum-400"
            >
              sydneyehill@gmail.com
            </a>
          </p>
        </header>

        <section>
          <SectionTitleDivider title="Work Experience" />
          <div className="space-y-12 mt-8 md:mt-12">
            <ResumeSection
              company="PassiveInvesting.com"
              title="Senior Software Engineer &amp; Designer"
              dates="Nov 2023 – Sep 2024"
              bullets={[
                "Built frontend of Vue.js + Capacitor app in 7 months",
                "Collaborated with backend engineers to design and develop internal REST API",
                "Created frontend test suite with Pinia + Jest",
              ]}
            />

            <ResumeSection
              company="ComplYant"
              title="Full Stack Software Engineer"
              dates="Jan 2022 – Oct 2023"
              bullets={[
                "Launched company’s first design library",
                "Cut dev cycles by building Figma prototypes for reviews + testing",
                "Proved expense tracking feature viability in 5 days via design sprint",
                "Shipped IRS 4868 filing tool in 4 months (backend + frontend)",
                "Developed client-side REST API integrations with external vendors",
                "Mapped features with ERDs and flowcharts for cross-team clarity",
              ]}
            />

            <ResumeSection
              company="Right Start Data"
              title="Designer &amp; Developer"
              dates="Jan 2020 – Dec 2021"
              bullets={[
                "Improved dev efficiency with detailed user flow designs (happy/unhappy paths)",
                "Expanded skills by building in React Native + Laravel",
                "Drove 300% sales increase via subscription + marketing platform",
              ]}
            />

            <ResumeSection
              company="Self Employed"
              title="Designer &amp; Developer"
              dates="Sep 2018 – Jan 2022"
              bullets={[
                "Maintained 100% Job Success Rate on Upwork",
                "Earned $20K on Upwork ($70K+ total) in first year of freelancing",
                "Proven ability to work independently and deliver on time",
              ]}
            />
          </div>
        </section>
      </section>
    </div>
  );
}
