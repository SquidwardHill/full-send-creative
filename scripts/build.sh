#!/bin/bash

# Exit on first error
set -e

echo "🚀 Starting build pipeline..."

echo "📸 Generating image manifest..."
npx tsx scripts/generateImageManifest.ts

echo "🔄 Merging case studies and importing to database..."
npx tsx scripts/mergeAndImport.ts

echo "📦 Running Prisma generate..."
npx prisma generate

echo "✅ Build pipeline complete!"
