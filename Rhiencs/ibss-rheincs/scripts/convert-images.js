const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const folders = [
  path.join(process.cwd(), "public"),
];

const extensions = [".webp", ".webp", ".webp"];

async function getImages(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  let images = [];

  for (const file of files) {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory()) {
      images = images.concat(await getImages(fullPath));
    } else if (extensions.includes(path.extname(file.name).toLowerCase())) {
      images.push(fullPath);
    }
  }

  return images;
}

async function convertImages() {
  const images = await getImages(folders[0]);

  console.log(`Found ${images.length} images`);

  for (const image of images) {
    const output = image.replace(/\.(jpg|jpeg|png)$/i, ".webp");

    try {
      await sharp(image)
        .webp({ quality: 80 })
        .toFile(output);

      console.log(`Converted: ${image} -> ${output}`);
    } catch (error) {
      console.error(`Failed: ${image}`, error.message);
    }
  }

  console.log("Image conversion completed!");
}

convertImages();