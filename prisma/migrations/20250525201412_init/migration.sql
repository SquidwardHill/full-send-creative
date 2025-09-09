-- CreateEnum
CREATE TYPE "SkillArea" AS ENUM ('PLANNING', 'DESIGN', 'FRONTEND', 'BACKEND', 'BUILD', 'TESTING', 'WORKFLOW');

-- CreateEnum
CREATE TYPE "ImageType" AS ENUM ('COVER', 'PROCESS');

-- CreateTable
CREATE TABLE "CaseStudy" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "hook" TEXT NOT NULL,
    "resumeSummary" TEXT NOT NULL,
    "tldr" TEXT NOT NULL,
    "challenge" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "contribution" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "themeColor" TEXT NOT NULL DEFAULT 'purple-pizzazz-500',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CaseStudy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaseStudySkill" (
    "id" TEXT NOT NULL,
    "caseStudyId"
    
     TEXT NOT NULL,
    "toolId" TEXT NOT NULL,
    "area" "SkillArea" NOT NULL,

    CONSTRAINT "CaseStudySkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tool" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "website" TEXT,

    CONSTRAINT "Tool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "caseStudyId" TEXT NOT NULL,
    "type" "ImageType" NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT,
    "description" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CaseStudy_slug_key" ON "CaseStudy"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Tool_name_key" ON "Tool"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Image_caseStudyId_type_key" ON "Image"("caseStudyId", "type");

-- AddForeignKey
ALTER TABLE "CaseStudySkill" ADD CONSTRAINT "CaseStudySkill_caseStudyId_fkey" FOREIGN KEY ("caseStudyId") REFERENCES "CaseStudy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseStudySkill" ADD CONSTRAINT "CaseStudySkill_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_caseStudyId_fkey" FOREIGN KEY ("caseStudyId") REFERENCES "CaseStudy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
