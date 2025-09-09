import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

async function backupData() {
  try {
    console.log("🔄 Creating database backup...");
    
    // Get all case studies with their related data
    const caseStudies = await prisma.caseStudy.findMany({
      include: {
        images: true,
        skills: {
          include: {
            tool: true
          }
        }
      }
    });
    
    // Get all tools and skills
    const tools = await prisma.tool.findMany();
    const skills = await prisma.skill.findMany();
    
    const backup = {
      caseStudies,
      tools,
      skills,
      timestamp: new Date().toISOString()
    };
    
    // Save backup to file
    const backupFile = `backup-${Date.now()}.json`;
    fs.writeFileSync(backupFile, JSON.stringify(backup, null, 2));
    
    console.log(`✅ Backup created: ${backupFile}`);
    console.log(`📊 Backed up: ${caseStudies.length} case studies, ${tools.length} tools, ${skills.length} skills`);
    
  } catch (error) {
    console.error("❌ Backup failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

backupData();
