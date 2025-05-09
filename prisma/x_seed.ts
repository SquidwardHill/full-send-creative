import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    const caseStudy = await prisma.caseStudy.create({
        data: {
          slug: "in-app-reservations",
          title: "In-App Reservations",
          hook: "Complex logic, clean UX—users book without a second thought.",
          resumeSummary: "Designed and built an intuitive reservation system for an unmanned facility.",
          tldr: "Balanced logic, user types, and timing issues into a seamless experience.",
          challenge: "Create a system that handled real-time availability, membership rules, and race conditions.",
          task: "Design a UX that worked for all user types and scenarios while being fast and intuitive.",
          contribution: "Led design and frontend dev, built Gherkin flows, handled state and API integration.",
          result: "A polished experience released successfully with strong user and stakeholder feedback.",
        },
    })
  console.log('✅ seeded')
  console.log({ caseStudy })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
