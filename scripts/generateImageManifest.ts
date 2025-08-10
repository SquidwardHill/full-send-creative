import fs from "fs";
import path from "path";

interface ImageManifestItem {
  slug: string;
  coverImage: string;
  processImages: string[];
}

const basePath = "./public/images/case-studies";

function getImageData() {
  const slugs = fs.readdirSync(basePath).filter((dir) => {
    const fullPath = path.join(basePath, dir);
    return fs.statSync(fullPath).isDirectory();
  });

  const manifest: ImageManifestItem[] = [];

  slugs.forEach((slug) => {
    const files = fs
      .readdirSync(path.join(basePath, slug))
      .filter((file) => /\.(jpg|jpeg|png)$/i.test(file))
      .sort();

    if (files.length === 0) return;

    const cover = files.find((f) => f.includes("cover")) || files[0];
    const others = files.filter((f) => f !== cover);

    manifest.push({
      slug,
      coverImage: `/images/case-studies/${slug}/${cover}`,
      processImages: others.map((f) => `/images/case-studies/${slug}/${f}`),
    });
  });

  return manifest;
}

const output = getImageData();
fs.writeFileSync("./app/data/image-manifest.json", JSON.stringify(output, null, 2));
console.log("✅ Image manifest generated.");
