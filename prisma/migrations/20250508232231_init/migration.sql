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
    "coverImageUrl" TEXT,
    "processImages" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CaseStudy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CaseStudy_slug_key" ON "CaseStudy"("slug");
