export default function Resume() {
  return (
    <div>
      <section id="resume" className="max-w-5xl mx-auto px-6 py-16">
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
          <h3 className="text-2xl font-semibold text-cream-100 mb-8">Work Experience</h3>
          <div className="space-y-12">
            <article className="grid md:grid-cols-4 gap-6">
              <div className="md:col-span-1">
                <p className="font-bold text-cream-100">
                  <a
                    href="http://PassiveInvesting.com"
                    target="_blank"
                    rel="noopener"
                    className="hover:underline"
                  >
                    PassiveInvesting.com
                  </a>
                </p>
                <p className="text-sm text-cream-200">Nov 2023 – Sep 2024</p>
              </div>
              <div className="md:col-span-3">
                <h4 className="font-semibold text-lg text-cream-100">
                  Senior Software Engineer &amp; Designer
                </h4>
                <ul className="list-disc list-inside mt-2 space-y-1 text-cream-200">
                  <li>
                    Built frontend of <strong>Vue.js + Capacitor</strong> app in{" "}
                    <strong>7 months</strong>
                  </li>
                  <li>
                    Collaborated with backend engineers to design and develop internal REST API
                  </li>
                  <li>
                    Created frontend test suite with <strong>Pinia + Jest</strong>
                  </li>
                </ul>
              </div>
            </article>

            <article className="grid md:grid-cols-4 gap-6">
              <div className="md:col-span-1">
                <p className="font-bold text-cream-100">ComplYant</p>
                <p className="text-sm text-cream-200">Jan 2022 – Oct 2023</p>
              </div>
              <div className="md:col-span-3">
                <h4 className="font-semibold text-lg text-cream-100">
                  Full Stack Software Engineer
                </h4>
                <ul className="list-disc list-inside mt-2 space-y-1 text-cream-200">
                  <li>
                    Launched company’s <strong>first design library</strong>
                  </li>
                  <li>
                    Cut dev cycles by building <strong>Figma prototypes</strong> for reviews +
                    testing
                  </li>
                  <li>
                    Proved expense tracking feature viability in <strong>5 days</strong> via design
                    sprint
                  </li>
                  <li>
                    Shipped IRS 4868 filing tool in <strong>4 months</strong> (backend + frontend)
                  </li>
                  <li>Developed client-side REST API integrations with external vendors</li>
                  <li>Mapped features with ERDs and flowcharts for cross-team clarity</li>
                </ul>
              </div>
            </article>

            <article className="grid md:grid-cols-4 gap-6">
              <div className="md:col-span-1">
                <p className="font-bold text-cream-100">Right Start Data</p>
                <p className="text-sm text-cream-200">Jan 2020 – Dec 2021</p>
              </div>
              <div className="md:col-span-3">
                <h4 className="font-semibold text-lg text-cream-100">Designer &amp; Developer</h4>
                <ul className="list-disc list-inside mt-2 space-y-1 text-cream-200">
                  <li>
                    Improved dev efficiency with detailed user flow designs (happy/unhappy paths)
                  </li>
                  <li>
                    Expanded skills by building in <strong>React Native + Laravel</strong>
                  </li>
                  <li>
                    Drove <strong>300% sales increase</strong> via subscription + marketing platform
                  </li>
                </ul>
              </div>
            </article>

            <article className="grid md:grid-cols-4 gap-6">
              <div className="md:col-span-1">
                <p className="font-bold text-cream-100">Self Employed</p>
                <p className="text-sm text-cream-200">Sep 2018 – Jan 2022</p>
              </div>
              <div className="md:col-span-3">
                <h4 className="font-semibold text-lg text-cream-100">Designer &amp; Developer</h4>
                <ul className="list-disc list-inside mt-2 space-y-1 text-cream-200">
                  <li>
                    Maintained <strong>100% Job Success Rate</strong> on Upwork
                  </li>
                  <li>
                    Earned <strong>$20K on Upwork</strong> ($70K+ total) in first year of
                    freelancing
                  </li>
                  <li>Proven ability to work independently and deliver on time</li>
                </ul>
              </div>
            </article>
          </div>
        </section>
      </section>
    </div>
  );
}
