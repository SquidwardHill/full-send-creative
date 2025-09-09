import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkData() {
  try {
    const caseStudies = await prisma.caseStudy.count();
    const tools = await prisma.tool.count();
    const skills = await prisma.skill.count();
    const images = await prisma.image.count();
    const caseStudySkills = await prisma.caseStudySkill.count();
    
    console.log('📊 Database Status:');
    console.log(`  Case Studies: ${caseStudies}`);
    console.log(`  Tools: ${tools}`);
    console.log(`  Skills: ${skills}`);
    console.log(`  Images: ${images}`);
    console.log(`  Case Study Skills: ${caseStudySkills}`);
    
    // Show some sample data
    const sampleTools = await prisma.tool.findMany({ take: 5 });
    console.log('\n🔧 Sample Tools:');
    sampleTools.forEach(tool => console.log(`  - ${tool.name}`));
    
    const sampleImages = await prisma.image.findMany({ take: 3 });
    console.log('\n📸 Sample Images:');
    sampleImages.forEach(img => console.log(`  - ${img.url} (${img.type})`));
    
    const sampleSkills = await prisma.skill.findMany({ take: 5 });
    console.log('\n🎯 Sample Skills:');
    sampleSkills.forEach(skill => console.log(`  - ${skill.name}`));
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkData();
