-- AlterTable
ALTER TABLE "CaseStudy" ALTER COLUMN "processImages" SET DEFAULT ARRAY[]::TEXT[];

-- CreateTable
CREATE TABLE "Tooling" (
    "id" TEXT NOT NULL,
    "caseStudyId" TEXT NOT NULL,
    "planning" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "design" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "frontend" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "backend" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "build" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "testing" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "workflow" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Tooling_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tooling_caseStudyId_key" ON "Tooling"("caseStudyId");

-- AddForeignKey
ALTER TABLE "Tooling" ADD CONSTRAINT "Tooling_caseStudyId_fkey" FOREIGN KEY ("caseStudyId") REFERENCES "CaseStudy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
